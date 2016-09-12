import React from 'react'
import { IndexLink, Link } from 'react-router'

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import SettingsDialog from './SettingsDialog';

class Header extends React.Component {
  render() {
    return (
      <Toolbar>
        <ToolbarGroup>
        </ToolbarGroup>
        <ToolbarGroup>
            <SettingsDialog
              ui_language={this.props.settings.ui_language}
              ipfs_gateway={this.props.settings.ipfs_gateway}
              root_hash={this.props.settings.root_hash}
              handleSaveSettings={this.props.handleSaveSettings}
            />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

Header.propTypes = {
  settings: React.PropTypes.object.isRequired,

  handleSaveSettings: React.PropTypes.func.isRequired,
}

export default Header
