
function Alert() {

    function alertDisplayNone() {
        const alert = document.querySelector('.alert-div');
        alert.style.display = 'none';
    }

    return (
        <div className="alert-div">
            <div className="alert-box">
                <h1>Please note</h1>
                <h2>
                    This website is only a recreation of the official Nomos Glashütte website.<br></br>
                    This is a web project for practicing and learning React and backend languages.
                </h2>
                <button onClick={alertDisplayNone}>I understand</button>
            </div>
        </div>
    )
}

export default Alert;