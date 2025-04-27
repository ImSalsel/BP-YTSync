import styled from 'styled-components';
import { HTMLAttributes } from 'react';

interface TestCyProps extends HTMLAttributes<HTMLDivElement> {
  'data-testid'?: string;
}

export const BlurredCode = styled.span<{ visible: boolean }>`
  font-weight: bold;
  font-size: 1.2rem;
  filter: ${({ visible }) => (visible ? 'none' : 'blur(8px)')};
  cursor: pointer;
  transition: filter 0.3s ease;
`;

export const CodeContainer = styled.div.attrs<TestCyProps>(() => ({
  'data-testid': 'code-display', 
}))`
  display: flex;
  position: absolute;
    top: 100px;
    right: 20px;
  width: 150px;
  height: 50px;
  align-items: center;
  background-color: rgb(18, 18, 19);
  padding: 10px;
  border-radius: 16px;
  color: #fff;
  `;