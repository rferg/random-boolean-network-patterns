import { css } from 'lit-element'

export const linkStyles = css`
    a, button {
        color: var(--light-primary-color);
        transition: color var(--animation-duration) var(--easing);
        cursor: pointer;
        text-decoration: underline;
        border: none;
        outline: none;
        background-color: transparent;
    }
    button {
        font-size: var(--font-size);
    }
    a:hover, a:focus, button:hover, button:focus, a:visited, a:active {
        color: var(--primary-color);
    }
`
