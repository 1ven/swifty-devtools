import * as React from 'react';
import * as Inspector from 'react-json-inspector'; 
import * as moment from 'moment';
import * as jsondiffpatch from 'jsondiffpatch';
import { createModel } from 'swifty';
import { compose, withState, lifecycle } from 'recompose';
import 'react-json-inspector/json-inspector.css'; 
import formatters from 'jsondiffpatch/src/main-formatters';
import 'jsondiffpatch/public/formatters-styles/html.css';
import Toggle from './Toggle';
import * as styles from './styles';

const jsondiff = jsondiffpatch.create();

const listenStateChange = (callback: (prev, current) => void) => {
  let prevState;
  createModel(this.props.reducer$).observe(currentState => {
    prevState = currentState;
    callback(prevState, currentState);
  });
}

const listenKeyDown = (callback: Function) => {
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 72 && e.ctrlKey) {
      callback();
    }
  })
}

export default compose(
  withState('visible', 'setVisibility', false),
  withState('history', 'setHistory', []),
  lifecycle({
    componentDidMount() {
      const { setHistory, setVisibility } = this.props;
      
      listenKeyDown(() => setVisibility(!this.props.visible));

      listenStateChange((prevState, currentState) => {
        const delta = prevState && jsondiff.diff(prevState, currentState);
        setHistory([...this.props.history, {
          title: moment().format('hh:mm:ss:SSS'),
          state: currentState,
          html: delta && formatters.html.format(delta, prevState)
        }])
      });
    },
  })
)(({ visible, history }) => (
  <div style={styles.root(visible)}>
    {history.map((item, i) => (
      <div key={i} style={styles.item}>
        <div>{item.title}</div>
        <Toggle link="State">
          <Inspector data={item.state} />
        </Toggle>
        {item.html && <Toggle link="Diff">
          <div dangerouslySetInnerHTML={{
            __html: item.html
          }} />
        </Toggle>}
      </div>
    ))}
  </div>
))