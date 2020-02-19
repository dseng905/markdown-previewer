import React from 'react';
import './App.css';
import Marked from 'marked';
import parse from 'html-react-parser';



const placeholderText =  
'![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1") \n' +
"# Markdown Previewer\n" + 
"## Overview\n The **Markdown Previewer** is an app that allows you to preview text written with Markdown markup language."+ 
"The app has two displays, one of which is the Markdown editor and the other is the previewer. The Markdown text can be "+
"previewed by pressing the **Preview** button. The positions of the editor and previewer can also be swapped by pressing the **Swap** Displays button.\n\n" +
"## Examples\n ### Blockquotes\n > A quick brown fox jumps over the lazy dog. \n\n" +
"### Code Blocks\n```javascript\nvar foo = 'bar';\nconsole.log(foo);\n```\n\n Inline `code` works as well e.g. `React.component`\n\n" +
`### Lists
1. First ordered list item
2. Another item
⋅⋅* Unordered sub-list. 
1. Actual numbers don't matter, just that it's a number
⋅⋅1. Ordered sub-list
4. And another item.

⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅
⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

* Unordered list can use asterisks
- Or minuses
+ Or pluses

If you are new and want to learn more about Markdown, check out [Markdown Guide](https://www.markdownguide.org/) to get started.\n`;


const Previewer = (props) => {
  const text = parse(Marked(props.text));
  return (
    <p id="preview" style={props.style}>{text}</p>
  )
}


class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      previewText: "",
      reverseDisplays: true,
      isRealTime: true,
      isDark: false    
    }

    this.handleText = this.handleText.bind(this);
    this.setPreviewText = this.setPreviewText.bind(this);
    this.swapDisplay = this.swapDisplay.bind(this);
    this.setRealTime = this.setRealTime.bind(this);
    this.setDarkMode = this.setDarkMode.bind(this);
  }

  componentDidMount() {
    this.setState({
      text: placeholderText,
      previewText: placeholderText
    })
  }

  handleText(e) {
    if(this.state.isRealTime) {
      this.setState({
        text: e.target.value,
        previewText: e.target.value
      });
    }
    else {
      this.setState({
        text: e.target.value
      })
    }
  }

  setPreviewText() {
    this.setState({
      previewText: this.state.text
    })
  }

  swapDisplay() {
    if(this.state.reverseDisplays === true) {
      this.setState({
        reverseDisplays: false
      });
    }
    else {
      this.setState({
        reverseDisplays: true
      })
    }
  }

  setRealTime(e) {
    this.setState({
      isRealTime: e.target.checked
    })
  }

  setDarkMode(e) {
    this.setState({
      isDark: e.target.checked
    })
  }
  
  render() {
    const darkMode = this.state.isDark ? {backgroundColor: 'black', color: 'white'} : {backgroundColor: 'white', color: 'black'}
    return (
      <div className="Editor">
        <div id="displays" style={this.state.reverseDisplays ? {flexDirection: 'row-reverse'} : {flexDirection: 'row'}}>
          <textarea 
            id="editor"
            defaultValue={placeholderText}
            onChange={this.handleText}
            style={darkMode}
          ></textarea>
          <Previewer
            text={this.state.previewText}
            style={darkMode}
          />
        </div>
        <div id="buttons">
          <button 
            id="preview-button" 
            onClick={this.setPreviewText}
          >Preview</button>
          <button
            id="swap-display-button"
            onClick={this.swapDisplay}
          >Swap</button>
          <label id="real-time-label">
            Real-Time
            <input
              id="real-time-checkbox"
              type="checkbox"
              checked={this.state.isRealTime}
              onChange={this.setRealTime}
            />
          </label>
          <label id="dark-mode-label">
            Dark Mode
            <input
              id="dark-mode-checkbox"
              type="checkbox"
              checked={this.state.isDark}
              onChange={this.setDarkMode}
            />
          </label>
        </div>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <Editor />
      <p id="copyright">Copyright 2020 Sovanarung Seng. All Rights Reserved.</p>
    </div>
  );
}

export default App;
