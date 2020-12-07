import { css } from 'lit-element'

export const headingsStyles = css`
    h1, h2, h3, h4, h5, h6 {
        font-weight: var(--bold-weight);
        margin-bottom: 1.5rem;
    }
    h1 {
        font-size: 3.052rem;
        line-height: 1.125;
    }
    h2 {
        font-size: 2.441rem;
        line-height: 1.15;
    }
    h3 {
        font-size: 1.953rem;
        line-height: 1.175
    }
    h4 {
        font-size: 1.563rem;
        line-height: 1.2;
    }
    h5 {
        font-size: 1.25rem;
        line-height: 1.225;
    }
    h6 {
        font-size: 1rem;
        line-height: 1.25;
    }
`
