import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

interface FooterProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  maxW?: string
  pad?: string
  imgW?: string
  m?: string
  fSize?: string
  hover?: string
  mBottom?: string
  bTop?: string
}

const FooterStyle = {
  // Wrapper for the entire Footer section
  Wrapper: styled.div<Partial<FooterProps>>`
    grid-area: footer;
    background: var(--secondary-color);
    padding: ${({ pad }): string => pad ?? ''};
    border-top: 1px solid var(--accent-color);
    margin-top: auto;
  `,

  // Section1 styling for internal links
  Section1: styled.div<Partial<FooterProps>>`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    max-width: ${({ maxW }): string => maxW || '1290px'};
    margin: 0 auto;
    justify-items: center;
    margin-top: ${({ bTop }): string => bTop || '8px'};
    background-color: 'none';

    @media screen and (max-width: 600px) {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
    }
  `,

  // Section2 styling for external links
  Section2: styled.div<Partial<FooterProps>>`
    border-top: 0.1em solid var(--border-color);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    text-align: center; /* Centers text within each item */
    max-width: ${({ maxW }): string => maxW || '1000px'};
    padding: ${({ pad }): string => pad ?? '1rem'};
    margin: 0 auto;
  `,

  // Section3 styling for web links and copyright
  Section3: styled.div<Partial<FooterProps>>`
    display: flex;
    justify-content: center;
    background-color: var(--primary-color);
    color: ${({ color }): string => color ?? ''};
    font-size: ${({ fSize }): string => fSize ?? '0.9rem'};
    padding: ${({ pad }): string => pad ?? '1rem'};
    border-top: 1px solid var(--border-color);
  `,

  // Container for internal links
  InternalLinkContainer: styled.div<Partial<FooterProps>>`
    display: flex;
    flex-direction: column;
    margin: ${({ m }): string => m ?? '1.5rem 0 1rem 0'};
  `,

  // Title styling for internal links
  InternalLinkTitle: styled.h2<Partial<FooterProps>>`
    margin-bottom: ${({ mBottom }): string => mBottom ?? '8px'};
    color: var(--accent-color);
    font-size: ${({ fSize }): string => fSize ?? '22px'};
    text-transform: capitalize;
    align-self: flex-start;
    font-weight: 700;
  `,

  // Styling for individual internal links
  InternalLinkItem: styled(Link)<Partial<FooterProps>>`
    color: var(--text-color);
    margin-bottom: ${({ mBottom }): string => mBottom ?? '0.7rem'};
    font-size: ${({ fSize }): string => fSize ?? '15px'};
    text-decoration: none;
    text-shadow: 1px 1px var(--shadow-color);
    text-transform: capitalize;

    align-self: flex-start;
    line-height: 1.2;
    font-weight: bold;
    transition: 0.3s ease-out;

    &:hover {
      color: var(--success-color);
      text-shadow: 2px 2px var(--shadow-color);
    }
  `,

  // Styling for external links with images
  ExternalLinkImg: styled.a<Partial<FooterProps>>`
    align-self: baseline;
    img {
      width: ${({ imgW }): string => imgW ?? '150px'};
    }
  `,

  // Styling for web links
  LinksWebInfo: styled(Link)<Partial<FooterProps>>`
    color: var(--text-color);
    margin-right: ${({ m }): string => m ?? '4rem'};
    font-size: ${({ fSize }): string => fSize ?? '15px'};
    text-decoration: none;
    text-transform: capitalize;
    text-shadow: 1px 1px var(--shadow-color);

    &:hover {
      color: var(--secondary-color);
    }
  `,

  // Styling for the copyright container
  CopyrightContainer: styled.div<Partial<FooterProps>>`
    font-size: ${({ fSize }): string => fSize ?? '15px'};
    color: var(--accent-color);

    .current-year {
      margin-right: 5px;
    }
  `
}

export default FooterStyle
