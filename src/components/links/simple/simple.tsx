import * as React from 'react';
import {Link} from "react-router-dom";

type Props = {
  to: string,
  className?: string,
  onClick?: ({}) => void,
  children?: React.ReactNode
};

const Simple: React.FunctionComponent<Props> = ({to, className, onClick, children}) => {
  return (
    <Link
      to={to}
      className={className}
      onClick={onClick} >
      {children}
    </Link>
  );
};

Simple.defaultProps = {
  className: ``,
  onClick: () => {},
  children: ``
};

export default Simple;
