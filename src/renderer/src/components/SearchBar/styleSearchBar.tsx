import styled from 'styled-components'

export const searchStyle = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    text-align: center;
  `,
  Title: styled.h1`
    margin-bottom: 30px;
    color: var(--primary-color); /* 90's bright pink */
    font-size: 32px;
    text-shadow: 2px 2px var(--accent-color);
  `,
  SearchContainer: styled.div`
    margin-bottom: 20px;
    width: 100%;
    max-width: 300px;
    position: relative;
  `,
  DropdownList: styled.ul`
    position: absolute;
    top: 270px;
    width: 35%;
    max-height: 250px;
    overflow-y: auto;
    background-color: var(--accent-color); /* 90's pastel orange */
    border: 2px solid var(--border-color);
    border-radius: 8px;
    list-style: none;
    padding: 0;
    margin: 0;
    z-index: 10;
  `,
  SearchInput: styled.input`
    width: 100%;
    padding: 12px;
    font-size: 18px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: 0 4px 6px var(--shadow-color);
    background-color: var(--accent-color); /* Light yellow */
    color: var(--primary-color);
  `,
  DropdownItem: styled.li<{ highlighted: boolean }>`
    padding: 12px;
    cursor: pointer;
    background-color: ${(props): string =>
      props.highlighted ? 'var(--background-color)' : 'var(--accent-color)'};
    color: #000;
    border-bottom: 1px solid var(--border-color);
    &:hover {
      background-color: var(--background-color);
    }
  `,
  MapContainer: styled.div`
    position: relative;
    width: 100%;
    max-width: 17600px;
    margin-top: 15rem;
  `,

  MapImage: styled.img`
    width: 100%;
    z-index: 1;
  `,

  Marker: styled.div<{ x: number; y: number }>`
    position: absolute;
    background-color: var(--error-color);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    top: ${(props): number => props.y}px;
    left: ${(props): number => props.x}px;
    transform: translate(-50%, -50%);
    z-index: 2;
  `
}

export default searchStyle
