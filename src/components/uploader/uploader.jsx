import React from "react";
import PropTypes from "prop-types";
import { isEmpty, merge, cloneDeep } from "lodash";
import { UploadTask } from "./task";
import styles from "./uploader.module.css";
import { Progressbar } from "./progressbar";

/**
 *上传组件
 *
 * @export
 * @class Uploader
 * @extends {React.PureComponent}
 */
export class Uploader extends React.Component {
  static propTypes = {
    multiple: PropTypes.bool,
    serviceUrl: PropTypes.string.isRequired,
    accept: PropTypes.string,
    onError: PropTypes.func,
    onSuccess: PropTypes.func,
    uploadButton: PropTypes.object,
    removeButton: PropTypes.object,
    style: PropTypes.object,
    uploadButtonStyle: PropTypes.object,
    progressbarContainerStyle: PropTypes.object,
    progressbar: PropTypes.object
  };
  static defaultProps = {
    multiple: true,
    accept: "*",
    onError: () => {},
    onSuccess: () => {},
    uploadButton: <button>上传</button>,
    removeButton: <span className={styles.removeIcon}>X</span>,
    style: {},
    removeButtonStyle: {},
    uploadButtonStyle: {},
    progressbarContainerStyle: {},
    progressbar: <Progressbar file="1" />
  };

  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  upload(files = []) {
    if (isEmpty(files)) {
      throw new Error("文件不能为空");
    }

    var uploadTasks = [];
    var promises = [];

    files.map(file => {
      var uploadTask = new UploadTask(file);
      uploadTask.onProgress = this.onProgress.bind(this);
      uploadTasks.push(uploadTask);
      promises.push(uploadTask.execAsync(this.props.serviceUrl));
    });

    this.setState({
      tasks: uploadTasks
    });

    Promise.all(promises)
      .then(result => {
        this.refresh();
        this.props.onSuccess();
      })
      .catch(error => {
        this.refresh();
        this.props.onError(error);
      });
  }

  refresh() {
    this.setState(this.state);
  }

  onProgress() {
    this.refresh();
  }

  removeTask() {}

  render() {
    return (
      <div style={this.props.style}>
        <div
          style={this.props.uploadButtonStyle}
          className={styles.uploadButton}
          onClick={e => {
            e.preventDefault();
            this.uploader && this.uploader.click();
          }}
        >
          {this.props.uploadButton}
        </div>
        <input
          type="file"
          style={{ display: "none" }}
          ref={reactElement => {
            this.uploader = reactElement;
          }}
          multiple={this.props.multiple}
          accept={this.props.accept}
          onChange={e => {
            const files = [];
            for (var i = 0; i < e.target.files.length; i++) {
              files.push(e.target.files.item(i));
            }
            this.upload(files);
            // this.upload([{ name: "A.jpg" }, { name: "B.jpg" }]);
          }}
        />
        {isEmpty(this.state.tasks) === false && (
          <div
            className={styles.progressbarContainer}
            style={this.props.progressbarContainerStyle}
          >
            <div className={styles.progressbar}>
              {this.state.tasks.map((task, taskIndex) => {
                var progressbarProps = merge(
                  cloneDeep(this.props.progressbar.props),
                  {
                    progress: task.progress,
                    isError: task.isError,
                    file: {
                      fileName: task.file.name
                    },
                    key: taskIndex
                  }
                );
                return React.cloneElement(
                  this.props.progressbar,
                  progressbarProps
                );
              })}
            </div>
            <div>
              <div
                className={styles.removeButton}
                style={this.props.removeButtonStyle}
                onClick={e => {
                  this.removeTask();
                }}
              >
                {this.props.removeButton}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
