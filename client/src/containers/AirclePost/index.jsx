import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'components/Chip';
import Toast from 'components/Toast';
import { uploadMarkdown } from 'actions/airclePost';

import './index.scss';

const toast = Toast.newInstance();

const propTypes = {
};

const style = {
    marginLeft: 20,
};

class AirclePost extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            desc: '',
            tabValue: '',
            tabs: [],
            markdown: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleAddTabs = this.handleAddTabs.bind(this);
        this.handleChip = this.handleChip.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    handleAddTabs() {
        const { tabValue, tabs } = this.state;
        const index = tabs.find(item => item.label === tabValue);
        if (index) {
            toast.show('不要添加重复的标签');
            return;
        }
        this.setState({
            tabs: [
                ...tabs,
                {
                    key: tabs.length,
                    label: tabValue,
                },
            ],
        });
    }

    handleChip(e) {
        this.setState({
            tabs: [
                ...e.chipData,
            ],
        });
    }

    handleChange(e, type) {
        this.setState({
            [type]: e.target.value,
        });
    }

    async handleFile(e) {
        const { uploadMarkdown } = this.props;
        console.log(e.target.files);
        try {
            await uploadMarkdown({ markdown: e.target.files[0] });
        } catch (error) {
            // no-catch
        }
    }

    render() {
        const { title, desc, tabs, tabValue, markdown } = this.state;

        const inputList = [
            {
                name: '标题',
                type: 'title',
                value: title,
            },
            {
                name: '简述',
                type: 'desc',
                value: desc,
            },
            {
                name: 'Markdown File',
                type: 'markdown',
                value: markdown,
            },
        ];

        return (
            <Paper zDepth={2} style={{ padding: 20 }}>
                {inputList.map((item) => {
                    const { name, type, value } = item;

                    return (
                        <div key={type}>
                            <TextField
                                hintText={name}
                                onChange={(e) => { this.handleChange(e, type); }}
                                value={value}
                                style={style}
                            />
                            <br />
                        </div>
                    );
                })}
                <div>
                    <TextField
                        hintText="添加标签"
                        onChange={(e) => { this.handleChange(e, 'tabValue'); }}
                        value={tabValue}
                        style={style}
                    />
                    <RaisedButton
                        label="添加"
                        primary
                        style={style}
                        onClick={this.handleAddTabs}
                    />
                    <br />
                </div>
                <input type="file" name="markdown" accept="" onChange={this.handleFile} />
                <Chip chipData={tabs} onChange={this.handleChip} />
                <RaisedButton label="提交" primary style={style} />
            </Paper>
        );
    }
}

AirclePost.propTypes = propTypes;

const mapStateToProps = () => ({ sth: 'sth' });
const mapDispatchToProps = { uploadMarkdown };

export default connect(mapStateToProps, mapDispatchToProps)(AirclePost);
