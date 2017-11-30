import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Chip from 'material-ui/Chip';

const propTypes = {
    chipData: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};

class ChipCom extends Component {
    constructor(props) {
        super(props);

        this.styles = {
            chip: {
                margin: 4,
            },
            wrapper: {
                marginLeft: 12,
                display: 'flex',
                flexWrap: 'wrap',
            },
        };
    }

    handleRequestDelete(key) {
        const { chipData, onChange } = this.props;

        const chipToDelete = chipData.map(chip => chip.key).indexOf(key);
        chipData.splice(chipToDelete, 1);
        onChange({ chipData });
    }

    renderChip(data) {
        return (
            <Chip
                key={data.key}
                onRequestDelete={() => this.handleRequestDelete(data.key)}
                style={this.styles.chip}
            >
                {data.label}
            </Chip>
        );
    }

    render() {
        const { chipData } = this.props;
        return (
            <section
                style={this.styles.wrapper}
            >
                {chipData.map(this.renderChip, this)}
            </section>
        );
    }
}

ChipCom.propTypes = propTypes;

export default ChipCom;
