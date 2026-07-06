import { Component } from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

interface CommandLineProps {
  prompt?: string;
  initialValue?: string;
  onCommand?: (command: string) => void;
}

@observer
export class CommandLine extends Component<CommandLineProps> {
  @observable accessor inputValue: string = this.props.initialValue || '';
  @observable accessor cursorVisible: boolean = true;

  private cursorInterval?: number;

  componentDidMount() {
    this.cursorInterval = window.setInterval(() => {
      this.toggleCursor();
    }, 500);
  }

  componentWillUnmount() {
    if (this.cursorInterval) {
      clearInterval(this.cursorInterval);
    }
  }

  @action
  toggleCursor = () => {
    this.cursorVisible = !this.cursorVisible;
  };

  @action
  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.inputValue = event.target.value;
  };

  @action
  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.props.onCommand?.(this.inputValue);
    }
  };

  render() {
    const { prompt = '$' } = this.props;
    const { inputValue, cursorVisible, handleInputChange, handleKeyDown } = this;

    return (
      <div className="relative flex items-center bg-gray-900 text-green-400 font-mono p-2 rounded">
        <span className="mr-2">{prompt}</span>
        <span className="flex-1">{inputValue}</span>
        <span
          className={`inline-block w-2 h-5 bg-green-400 ml-0.5 ${
            cursorVisible ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="absolute inset-0 opacity-0 w-full h-full cursor-default"
          style={{ caretColor: 'transparent' }}
          autoFocus
        />
      </div>
    );
  }
}
