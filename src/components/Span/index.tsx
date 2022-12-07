import { TSpanProps } from '../../util/types';
import styled from 'styled-components';

const SpanStyle = styled.span`
    color:${props => props.className === 'error' ? 'red' :
        (props.className === 'warning' ? 'orange' : 'green')
    };
    
`;

const Span = ({ texto, className }: TSpanProps) => {
    return (
        <SpanStyle className={className}>
            {texto}
        </SpanStyle>
    );
}

export default Span;