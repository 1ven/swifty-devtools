import * as React from 'react';
import { compose, withState } from 'recompose';

export default compose(
  withState('isActive', 'setActive', false)
)(({
  link,
  setActive,
  children,
  isActive,
}: Props & Injected) => (
  <div>
    <div onClick={() => setActive(!isActive)}>{link}</div>
    {isActive && (
      <div>{children}</div>
    )}
  </div>
))

type Injected = {
  setActive: (active: boolean) => void,
}

export type Props = {
  link: string,
  children: React.Node,
  isActive?: boolean,
}