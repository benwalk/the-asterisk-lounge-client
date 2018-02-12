import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import { invokeApig, s3Upload } from "../libs/awsLib";

export default class Notes extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      note: null,
      content: "",
      isLoading: null,
      isDeleting: null
    };
  }

  async componentDidMount() {
    try {
      const results = await this.getNote();
      this.setState({
        note: results,
        content: results.content
      });
    }
    catch (e) {
      alert(e);
    }
  }

  getNote() {
    /*
      We get the id of our note from the URL using the props automatically
      passed to us by React-Router in this.props.match.params.id. The keyword
      id is a part of the pattern matching in our route (/notes/:id).
    */
    return invokeApig({ path: `/notes/${this.props.match.params.id}` });
  }

  saveNote(note) {
    return invokeApig({
      path: `/notes/${this.props.match.params.id}`,
      method: "PUT",
      body: note
    });
  }

  deleteNote() {
    return invokeApig({
      path: `/notes/${this.props.match.params.id}`,
      method: "DELETE"
    });
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  formatFilename(str) {
    return str.lenght < 50 ?
      str :
      `${str.substr(0,20)}...${str.substr(str.length - 20, str.length)}`;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleSubmit = async event => {
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert("Please pick a smaller file.");
      return;
    }

    this.setState({ isLoading: true });

    let uploadFilename;

    try {
      if (this.file) {
        uploadFilename = (await s3Upload(this.file)).Location;
      }

      /*
      TODO: delete old attachment when new one is saved; see:
        http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteObject-property
      */
      await this.saveNote({
        ...this.state.note,
        content: this.state.content,
        attachment: uploadFilename || this.state.note.attachment
      });
      this.props.history.push("/");
    }
    catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  handleDelete = async event => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }
    this.setState({ isDeleting: true });

    try {

      /*
      TODO: delete attachment if exists; see:
        http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteObject-property
      */
      
      await this.deleteNote();
      this.props.history.push("/");
    }
    catch (e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  }

  render() {
    return (
      <div className="Notes">
        {
          this.state.note &&
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="content">
              <FormControl
                onChange={this.handleChange}
                value={this.state.content}
                componentClass="textarea"
              />
            </FormGroup>
            {
              this.state.note.attachment &&
              <FormGroup>
                <ControlLabel>Attachment</ControlLabel>
                <FormControl.Static>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={this.state.note.attachment}
                  >
                    {this.formatFilename(this.state.note.attachment)}
                  </a>
                </FormControl.Static>
              </FormGroup>
            }
            <FormGroup controlId="file">
              {
                !this.state.note.attachment &&
                <ControlLabel>Attachment</ControlLabel>
              }
              <FormControl onChange={this.handleFileChange} type="file" />
            </FormGroup>
            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Save"
              loadingText="Saving…"
            />
            <LoaderButton
              block
              bsStyle="danger"
              bsSize="large"
              isLoading={this.state.isDeleting}
              onClick={this.handleDelete}
              text="Delete"
              loadingText="Deleting…"
            />
          </form>
        }
      </div>
    );
  }
}
