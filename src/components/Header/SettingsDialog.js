import React from 'react'
import { IndexLink, Link } from 'react-router'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ActionSettingsIcon from 'material-ui/svg-icons/action/settings';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class SettingsDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,

      ui_language: this.props.ui_language,

      ipfs_gateway: this.props.ipfs_gateway,
      root_hash: this.props.root_hash,
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSaveClose = () => {
    this.props.handleSaveSettings({
        ui_language: this.state.ui_language,

        ipfs_gateway: this.state.ipfs_gateway,
        root_hash: this.state.root_hash,
    })
    this.handleClose();
  };

  // TODO: live preview of language
  handleLanguageChange = (event, index, value) => this.setState({...this.state, ui_language: value});

  handleIpfsGatewayChange = (event, index, value) => this.setState({...this.state, ipfs_gateway: event.target.value});
  handleRootHashChange = (event, index, value) => this.setState({...this.state, root_hash: event.target.value});

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSaveClose}
      />,
    ];

    return (
      <div>
        <IconButton tooltip="Settings" onTouchTap={this.handleOpen}>
          <ActionSettingsIcon/>
        </IconButton>
        <Dialog
            title="Settings"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
        >
          <TextField
            floatingLabelText="IPFS gateway"
            value={this.state.ipfs_gateway}
            onChange={this.handleIpfsGatewayChange}
          />
          <TextField
            floatingLabelText="Wikidata root hash"
            value={this.state.root_hash}
            onChange={this.handleRootHashChange}
          />
          <SelectField value={this.state.ui_language} onChange={this.handleLanguageChange}>
            <MenuItem value="en-gb" primaryText="British English" />
            <MenuItem value="de" primaryText="German" />
          </SelectField>
        </Dialog>
      </div>
    );
  }
}

SettingsDialog.propTypes = {
  ui_language: React.PropTypes.string.isRequired,

  ipfs_gateway: React.PropTypes.string.isRequired,
  root_hash: React.PropTypes.string.isRequired,

  handleSaveSettings: React.PropTypes.func.isRequired,
}

export default SettingsDialog
