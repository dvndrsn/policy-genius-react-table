const { createStore } = Redux;

// React Components
var Table = React.createClass({
	render: function() {
		return (
			<table>
				<TableHeader cols={this.props.cols} />
				<TableBody cols={this.props.cols} data={this.props.data}/>
			</table>
		);
	}
});

var TableHeader = React.createClass({
	render: function() {
			var columnHeaders = this.props.cols.map(function(col) {
			return(<th> {col.name} </th>);
		});
		return (
			<thead>
				<tr>{columnHeaders}</tr>
			</thead>
		);
	}
});

var TableBody = React.createClass({
	render: function() {
		var rows = this.props.data.map(function(row) {
			return(
				<TableRow rowData={row} cols={this.props.cols} />
			);
		}.bind(this));
		return (
			<tbody>
				{rows}
			</tbody>
		);
	}
});

var TableRow = React.createClass({
	render: function() {
		var row = this.props.cols.map(function(col) {
			var default_format = (val) => val;
			var format = col.format || default_format;
			return(
				<td>
					{format(this.props.rowData[col.key])}
				</td>
			);
		}.bind(this));
		return (
			<tr>
				{row}
			</tr>
		);
	}
});

// constants and helper functions
var formatMoney = (val) => {
	return '$' + val.toFixed(2);
};

const POLICY_URL = "/api/policies"

const VISIBLE_COLUMNS = [
	//{key: 'carrier', name: 'Carrier'},
	{key: 'carrier_name', name: 'Carrier Name'},
	{key: 'monthly_premium', name: 'Monthly Premium', format: formatMoney},
	{key: 'annual_premium', name: 'Annual Premium', format: formatMoney},
    {key: 'name', name: 'Policy Name'},
    //{key: 'underwriting_class', name: 'Underwriting Class'},
    {key: 'health_category', name: 'Health Category'},
    {key: 'coverage_amount', name: 'Coverage Amount', format: formatMoney},
    {key: 'term_in_years', name: 'Term in Years'}
    //,{key: 'table_rating', name: 'Table Rating'}
    ];

const TEST_DATA = [
	{"carrier":"aig","carrier_name":"American General Life Insurance Company",
	 "monthly_premium":56.4,"annual_premium":652.0,
	 "name":"Select-a-Term - 30 Year  (Nov 2015)","underwriting_class":null,
	 "health_category":"Preferred Plus Non-Tobacco","coverage_amount":700000,
	 "term_in_years":30,"table_rating":0},
    {"carrier":"prudential","carrier_name":"Pruco Life Insurance Company",
	"monthly_premium":60.57,"annual_premium":673.0,
	"name":"Term Essential 30 (","underwriting_class":null,
	"health_category":"Preferred Best","coverage_amount":700000,
	"term_in_years":30,"table_rating":0}
    	];

const INITIAL_STATE = {
	url: POLICY_URL,
	cols: VISIBLE_COLUMNS,
	data: []
}

// Redux actions
const REQUEST_POLICIES = 'REQUEST_POLICIES';

function requestPolicies () {
	return {
		type: REQUEST_POLICIES
	};
}

const RECIEVE_POLCIES = 'RECIEVE_POLCIES';

function recievePolicies (data) {
	return {
		type: RECIEVE_POLCIES,
		data: data.underwritten_policies
	};
}

// Redux Reducer
const policyApp = (state = INITIAL_STATE, action)  => {
	switch(action.type) {
		case REQUEST_POLICIES:
			loadDataFromServer(state.url);
			return state;
		case RECIEVE_POLCIES:
			return Object.assign({}, state, 
	  			{ data: action.data }
	  			);
  		default:
  			return state;
	}
  
  return state;
}

// React Render & Redux store
const store = createStore(policyApp);
const render = () => {
	ReactDOM.render(
		<Table
			url={store.getState().url}
			data={store.getState().data}
			cols={store.getState().cols} />,
		document.getElementById('content')
	);
}

const loadDataFromServer = function (url) {	
	$.ajax({
		url: url,
		dataType: 'json',
		cache: false,
		success: function(data) {
			store.dispatch(recievePolicies(data));
		}.bind(store),
		error: function(xhr, status, err) {
			console.error(url, status, err.toString());
		}
	});
}.bind(store);

store.subscribe(render);
render();
store.dispatch(requestPolicies());

