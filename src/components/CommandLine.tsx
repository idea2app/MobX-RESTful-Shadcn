import React, { Component } from 'react';

interface CommandLineProps {
  prompt?: string;
  commands?: string[];
  onCommand?: (command: string) => void;
}

interface CommandLineState {
  input: string;
  history: string[];
}

export default class CommandLine extends Component<CommandLineProps, CommandLineState> {
  static defaultProps: CommandLineProps = {
    prompt: '>',
    commands: ['help', 'clear', 'exit'],
    onCommand: () => {},
  };

  constructor(props: CommandLineProps) {
    super(props);
    this.state = {
      input: '',
      history: [],
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: event.target.value });
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const { input, history } = this.state;
      const { onCommand } = this.props;
      if (onCommand) {
        onCommand(input);
      }
      this.setState({ history: [...history, input], input: '' });
    }
  };

  render() {
    const { prompt } = this.props;
    const { input, history } = this.state;
    return (
      <div className="command-line">
        <div className="command-line-output">
          {history.map((cmd, index) => (
            <div key={index} className="command-line-entry">
              <span className="command-line-prompt">{prompt}</span>
              <span className="command-line-command">{cmd}</span>
            </div>
          ))}
        </div>
        <div className="command-line-input-row">
          <span className="command-line-prompt">{prompt}</span>
          <input
            type="text"
            value={input}
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
            className="command-line-input"
            autoFocus
          />
        </div>
      </div>
    );
  }
}
