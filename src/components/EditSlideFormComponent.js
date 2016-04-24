'use strict';

import React from 'react';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

require('styles//EditSlideForm.scss');

class EditSlideFormComponent extends React.Component {

  handleSave = () => {
    const slide = {
      'url': this.refs.url.getValue(),
      'duration': this.refs.duration.getValue()
    };

    if (typeof(this.props.currentSlide) != 'undefined') {
      this.props.onUpdate(this.props.currentSlide._id, slide);
    }
    else {
      this.props.onSave(slide);
    }
  }

  render() {
    return (
      <div className="editslideform-component">
        <TextField
          fullWidth={true}
          ref="url"
          floatingLabelText="Url"
          defaultValue={typeof(this.props.currentSlide) != 'undefined' ? this.props.currentSlide.url : ''}
        />
        <br />
        <TextField
          ref="duration"
          floatingLabelText="Duration (ms)"
          defaultValue={typeof(this.props.currentSlide) != 'undefined' ? this.props.currentSlide.duration : ''}
        />
        <FlatButton
          label={typeof(this.props.currentSlide) == 'undefined' ? 'Add' : 'Update'}
          primary={true}
          onTouchTap={this.handleSave}
        />
      </div>
    );
  }
}

EditSlideFormComponent.displayName = 'EditSlideFormComponent';
EditSlideFormComponent.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  onUpdate: React.PropTypes.func.isRequired,
  currentSlide: React.PropTypes.any.isRequired
};

EditSlideFormComponent.defaultProps = {
  currentSlide: undefined
};

export default EditSlideFormComponent;
