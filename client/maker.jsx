const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const handleDomo = (e) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#domoName').value;
    const age = e.target.querySelector('#domoAge').value;

    if (!name || !age) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, { name, age });
    return false;
}

const deleteDomo = (e) => {
    e.preventDefault();
    helper.hideError();

    
}

const DomoForm = (props) => {
    return (
        <form id="domoForm"
            onSubmit={handleDomo}
            name="domoForm"
            action="/maker"
            method="POST"
            className="domoForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="domoName" type="text" name="name" placeholder="Domo Name" />
            <label htmlFor="age">Age: </label>
            <input id="domoAge" type="number" min="0" name="age" />
            <input className="makeDomoSubmit" type="submit" value="Make Domo" />
        </form>
    )
}

const DomoList = (props) => {
    if (props.domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos Yet!</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(domo => {
        return (
            <div key={domo._id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="domoName"> Name: {domo.name} </h3>
                <h3 className="domoAge"> Age: {domo.age} </h3>
                <button className="deleteDomo" onClick={deleteDomo}>Delete</button>
            </div>
        );
    });

    return (
        <div className="domoList">
            {domoNodes}
        </div>
    );
}

const handlePasswordChange = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const oldpass = e.target.querySelector('#oldpass').value;
    const newpass = e.target.querySelector('#newpass').value;
    const newpass2 = e.target.querySelector('#newpass2').value;

    if (!username || !oldpass || !newpass || !newpass2) {
        helper.handleError('All fields are required!');
        return false;
    }

    if (newpass !== newpass2) {
        helper.handleError('New passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, { username, oldpass, newpass, newpass2 });

    return false;
}

const ChangePasswordWindow = (props) => {
    return (
        <form id="changePasswordForm"
            name="changePasswordForm"
            onSubmit={handlePasswordChange}
            action="/changePassword"
            method="POST"
            className="mainForm"
        >
            <div id="labels">
                <label htmlFor="username">Username: </label>
                <label htmlFor="oldpass">Old Password: </label>
                <label htmlFor="newpass">New Password: </label>
                <label htmlFor="newpass2">Confirm New Password: </label>
            </div>
            <div id="inputs">
                <input id="user" type="text" name="username" placeholder="username" />
                <input id="oldpass" type="password" name="oldpass" placeholder="Old Password" />
                <input id="newpass" type="password" name="newpass" placeholder="New Password" />
                <input id="newpass2" type="password" name="newpass2" placeholder="Confirm New Password" />
            </div>
            <input className="formSubmit" type="submit" value="Change Password" />
        </form>
    );
}

const loadDomosFromServer = async () => {
    const response = await fetch('/getDomos');
    const data = await response.json();
    ReactDOM.render(
        <DomoList domos={data.domos} />,
        document.getElementById('domos')
    );
}

const init = () => {
    const changePasswordButton = document.getElementById('changePassword');

    changePasswordButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<ChangePasswordWindow />,
            document.getElementById('content'));
        return false;
    });

    ReactDOM.render(
        <DomoForm />,
        document.getElementById('makeDomo')
    );

    ReactDOM.render(
        <DomoList domos={[]} />,
        document.getElementById('domos')
    );

    loadDomosFromServer();
}

window.onload = init;