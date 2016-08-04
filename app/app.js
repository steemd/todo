var LS = localStorage,
    items = [
                {status: false, task: 'Buy milk and cookies'},
                {status: false, task: 'Pay for parking'},
                {status: false, task: 'To deal with the event handlers in ReactJS'}
            ];

    // Clear localStorage
    //delete LS.items;

var Todo = React.createClass({
    getInitialState: function(){
        if (LS.items) {
            items = JSON.parse(LS.items);
        }
        return {
            items: items
        };
    },
    newItems: [],
    componentWillMount: function() {
        console.log('component will mount');
    },
    componentDidMount: function() {
        console.log('component did mount');
        this.newItems = this.state.items;
    },
    componentWillUpdate: function() {
        console.log('component will update');
        this.newItems = this.state.items;
    },
    componentDidUpdate: function() {
        console.log('component did update'); 
    },
    addTask: function(text){
        //var items = this.state.items;
        this.newItems.push({status: false, task: text});      
        LS.items = JSON.stringify(this.newItems);
        this.setState({items: this.newItems});
    },
    removeTask: function(index){
        //var items = this.state.items;
        this.newItems.splice(index, 1);
        LS.items = JSON.stringify(this.newItems);
        this.setState({items: this.newItems});
    },
    checkTask: function(index) {
        //var items = this.state.items;
        this.newItems[index].status = !this.newItems[index].status;
        LS.items = JSON.stringify(this.newItems);
        this.setState({items: this.newItems});
    },
    saveTask: function(text, index) {
        //var items = this.state.items;
        this.newItems[index].task = text;
        LS.items = JSON.stringify(this.newItems);
        this.setState({items: this.newItems});
    },
    render: function() {
        return (
            <div className="container">
                <h1>TODO app</h1>
                <TodoForm addItem={this.addTask} />
                <TodoList items={this.state.items} removeItem={this.removeTask} checkItem={this.checkTask} saveItem={this.saveTask} />
            </div>
        );
    }
});

var TodoForm = React.createClass({
    addTask: function(){
        if (this.refs.myTask.value.length > 0) {
            this.props.addItem(this.refs.myTask.value);
            this.refs.myTask.value = '';
        }  
    },
    render: function(){
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <div className="input-group">
                            <input ref="myTask" type="text" className="form-control input-lg" placeholder="Enter new task" />
                            <div className="input-group-addon btn btn-primary" onClick={this.addTask}>
                                <span className="glyphicon glyphicon-plus"></span> Add Task
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var TodoList = React.createClass({
    render: function () {
        var removeItem = this.props.removeItem,
             checkItem = this.props.checkItem,
             saveItem = this.props.saveItem;

        var items = this.props.items.map(function(el, index){
            return (
                <TodoItem key={index} index={index} item={el} removeTask={removeItem} checkTask={checkItem} saveTask={saveItem} />
            );
        });

        return (
            <ul className="list-group">
                {items}
            </ul>
        );
    }
});

var TodoItem = React.createClass({
    getInitialState: function(){
        return {edit: false};
    },
    removeTask: function(){
        this.props.removeTask(this.props.index);
    },
    checkTask: function() {
        this.props.checkTask(this.props.index);
    },
    editTask: function(){
        this.setState({edit: true});
    },
    saveTask: function(){
        var text = this.refs.myData.value;
        this.props.saveTask(text, this.props.index);
        this.setState({edit: false});
    },
    render: function() {
        var done = this.props.item.status ? 'done' : '',
            result;
        
        if (this.state.edit) {
            result = (
                <div className="row">
                    <div className="col-md-1">
                        <button className="btn btn-default" onClick={this.checkTask}><span className="glyphicon glyphicon-ok"></span></button>
                    </div>
                    <div className="col-md-10">
                        <input ref="myData" type="text" className="form-control"  defaultValue={this.props.item.task} />        
                    </div>
                    <div className="col-md-1 text-right">
                        <button className="btn btn-success" onClick={this.saveTask}><span className=" glyphicon glyphicon-ok"></span></button>
                    </div>
                </div>
            );
        } else {
            result = (
                <div className="row">
                    <div className="col-md-1">
                        <button className="btn btn-default" onClick={this.checkTask}><span className="glyphicon glyphicon-ok"></span></button>
                    </div>
                    <div className="col-md-9">
                        {this.props.item.task}
                    </div>
                    <div className="col-md-2 text-right">
                        <button className="btn btn-default" onClick={this.editTask}><span className="glyphicon glyphicon-pencil"></span></button> 
                        <button className="btn btn-info" onClick={this.removeTask}><span className="glyphicon glyphicon-trash"></span></button>
                    </div>
                </div>
            );
        }
        return (
            <li className={done + ' list-group-item'}>
                {result}
            </li>
        );
    }
});

ReactDOM.render(<Todo />, document.getElementById('content'));