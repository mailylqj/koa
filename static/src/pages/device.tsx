import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { Cookies } from '@/component/utils';

class Device extends React.Component {
	constructor(props) {
		super(props);
		this.state = {device : []};
	}
	componentDidMount(){
		let that = this;
		let user = { username: Cookies.get('__pin'), token: Cookies.get('__token') };
		axios.post('/ajax/getDeviceList', user).then(function(data){
			let result = data.data;
			if(result.result == 0){
				that.setState({ 'device': result.data });
			}else{
				toast.error(result.message);
			}
		});
	}
	render() {
		if (!this.props.style) {
			return null;
		}
		return (
			<div className={this.props.style} id="content">
				<div className="page">
					<div className="panel panel-default">
						<div className="panel-heading">
							<span>在线设备列表</span>
						</div>
						<table className="table table-hover">
							<thead>
								<tr><th>#</th><th>设备编号</th><th>设备名称</th><th>状态</th><th>数据</th></tr>
							</thead>
							<tbody>
							{this.state.device.map((item, index) => {
								return (
									<tr key={index}>
										<td>{index}</td>
										<td><Link to={'/visual/' + item.deviceNO} title={item.deviceNO}>{item.deviceNO}</Link></td>
										<td><span className="color-success"><i className="fa fa-level-up"></i></span>{item.deviceName}</td>
										<td><span className={'label ' + (item.onLine ? 'label-success' : 'label-default')}>{item.onLine ? '在线' : '离线'}</span></td>
										<td>
											<Link className="btn btn-sm btn-success" to={'/virtual/' + item.deviceNO} title={item.deviceNO}>查看实时数据</Link>
											<div className="space"></div>
											<Link className="btn btn-sm btn-primary" to={'/history/' + item.deviceNO} title={item.deviceNO}>查看历史数据</Link>
											<div className="space"></div>
											<Link className="btn btn-sm btn-danger" to={'/control/' + item.deviceNO} title={item.deviceNO}>查看控制数据</Link>
											<div className="space"></div>
											<Link className="btn btn-sm btn-warning" to={'/alarm/' + item.deviceNO} title={item.deviceNO}>查看报警数据</Link>
										</td>
									</tr>
								);
							})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

Device.propTypes = {
	style: PropTypes.string
};

Device.defaultProps = {
	style: 'wapper'
};

export default Device;
