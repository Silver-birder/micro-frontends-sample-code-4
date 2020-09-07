import {LitElement, html, customElement, css, property, eventOptions} from 'lit-element';

@customElement('search-box')
export class SearchBox extends LitElement {
    static styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;
    @property({type: String})
    keyword = '';

    render() {
        return html`
         <div>
            <input type="text" id="keyword" @change="${this._onChange}" value="${this.keyword}"><button @click="${this._onClick}">検索</button>     
            <product-item></product-item>
         </div>
    `;
    }

    @eventOptions({capture: true})
    private _onClick() {
        this.dispatchKeywordEvent(this.keyword);
        this.dispatchHistoryEvent(this.keyword);
    }

    dispatchKeywordEvent(keyword: string) {
        const search: SearchBoxEvent = {
            detail: {
                keyword: keyword,
                callback: (async (keyword: string) => {
                    console.log(keyword);
                    const map = new Map();
                    this.update(map)
                }).bind(this)
            },
            cancelable: true
        };
        let event: CustomEvent = new CustomEvent('search-box-button-click', search);
        const cancel = window.dispatchEvent(event);
        console.log(cancel);
    }

    dispatchHistoryEvent(keyword: string) {
        const search: SearchBoxEvent = {
            detail: {
                keyword: keyword,
            },
            cancelable: true
        };
        let event: CustomEvent = new CustomEvent('search-box-keyword-history', search);
        const cancel = window.dispatchEvent(event);
        console.log(cancel);
    }

    @eventOptions({capture: true})
    private _onChange(e: Event) {
        this.keyword = (<HTMLInputElement>e.target).value;
    }
}

export interface SearchBoxEvent extends CustomEventInit {
    detail: {
        keyword: String,
        callback?(keyword: String): void
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'search-box': SearchBox;
    }
}
