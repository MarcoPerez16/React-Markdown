import React from 'react';
import './App.scss';
import { marked } from 'marked';
import Prism from "prismjs";


const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://github.com/MarcoPerez16), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![html image](https://s3.amazonaws.com/s3.timetoast.com/public/uploads/photo/17959187/image/medium-fe0247cebdaf8334db47bf281f2b95ec.png)
`;

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
});
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder,
      editorMaximized: false,
      previewMaximized: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMax = this.handleEditorMax.bind(this);
    this.handlePreviewMax = this.handlePreviewMax.bind(this);
  }

  handleChange(e) {
    this.setState({
      markdown: e.target.value
    });
  }

  handleEditorMax(){
    this.setState({
      editorMaximized: !this.state.editorMaximized
    });
  }

  handlePreviewMax() {
    this.setState({
      previewMaximized: !this.state.previewMaximized
    });
  }

  render() {
    const types = this.state.editorMaximized
    ? ['editor Max', 'preview hide', 'fa-solid fa-down-left-and-up-right-to-center']
    : this.state.previewMaximized 
    ? ['editor hide', 'preview Max', 'fa-solid fa-down-left-and-up-right-to-center']
    : ['editor', 'preview', 'fa-solid fa-up-right-and-down-left-from-center'];
    return (
      <div className="App">
        <div className={types[0]}>
          <Toolbar title="Editor" icon={types[2]} onClick={this.handleEditorMax}/>
          <Editor markdown={this.state.markdown} onChange={this.handleChange}/>
        </div>
        <br></br>
        <br></br>
        <div className={types[1]}>
          <Toolbar title="Preview" icon={types[2]} onClick={this.handlePreviewMax}/>
          <Preview markdown={this.state.markdown}/>
        </div>
      </div>
    );
  }
}

const Toolbar = (props) => {
  return (
    <div className='Toolbar'>
      <i className="fa-solid fa-fire-flame-curved"></i>
      <span>{props.title}</span>
      <i className={props.icon} onClick={props.onClick}></i>
    </div>
  )
}

const Editor = (props) => {
  return (
    <textarea 
      id='editor'
      type="text"
      onChange={props.onChange}
      value={props.markdown}
    />
  )
}

const Preview = (props) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: marked(props.markdown, { renderer: renderer })
      }}
      id="preview"
    />
  )
}

export default App;