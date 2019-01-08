import React from 'react';
import { View } from 'react-native';

class Spacer extends React.Component {
    render() {
        const style = {
            width: this.props.width || 0,
            height: this.props.height || 0,
        };
        return <View style={style} />;
    }
}

export default Spacer;
