import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _ from 'lodash';
import moment from 'moment';
let soilValues = [];
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class IndexPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.props.getSoil();
        setInterval(() => {
            soilValues = [];
            this.props.getSoil();
        }, 2000);
    }

    doRender(val) {
        if (val !== undefined) {
            _.forIn(val, function(value, key) {
                let name = moment(parseInt(key)).format('HH:mm:ss');
                soilValues.push({ name, "Soil Value": value });
            });
        }
    }

    chart(soilValues) {
        if (soilValues.length > 0) {
            return (
                <div>
                    <LineChart width={730} height={250} data={soilValues}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line isAnimationActive={false} type="monotone" dataKey="Soil Value" stroke="#8884d8" />
                    </LineChart>
                </div>
            );
        }
    }

    render() {
        this.doRender(this.props.soil);
        return (
            <div>
                                    SOIL VALUES:
      {this.chart(soilValues)}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { soil: state.soil.soil };
}

IndexPage.propTypes = {
    soil: PropTypes.object,
    getSoil: PropTypes.func.isRequired
};

export default connect(mapStateToProps, actions)(IndexPage);