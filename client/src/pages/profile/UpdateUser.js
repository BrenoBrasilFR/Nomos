import { useState } from "react"

const UpdateUser = () => {
    let [fname, setfname] = useState("")
    let [lname, setlname] = useState("")
    let [email, setemail] = useState("")
    let [password1, setpassword1] = useState("")
    let [password2, setpassword2] = useState("")
    let [profileStatus, setProfileStatus] = useState(0)
    let [passwordStatus, setPasswordStatus] = useState(0)

    const handleProfileUpdate = (e) => {
        e.preventDefault()

        fname = fname.trim()
        lname = lname.trim()
        fname = fname.charAt(0).toUpperCase() + fname.slice(1);
        lname = lname.charAt(0).toUpperCase() + lname.slice(1);

        let form = {
            fname: fname,
            lname: lname,
            email: email
        }

        form = JSON.stringify(form)

        fetch('/api/user_session/user_update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: form
        }).then(res => {
            switch (res.status) {
                case 200:
                    setProfileStatus(200)
                    document.getElementById('fname').value = ''
                    document.getElementById('lname').value = ''
                    document.getElementById('email').value = ''
                    break;
                case 500:
                    setProfileStatus(500)
                    break;
                default:
                    setProfileStatus(1)
            }
        })
    }

    const handlePasswordUpdate = (e) => {
        e.preventDefault()

        if (password1 === password2) {
            let password = password1;

            let form = {
                password: password,
            }

            form = JSON.stringify(form)

            fetch('/api/user_session/user_update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: form
            }).then(res => {
                switch (res.status) {
                    case 200:
                        setPasswordStatus(200)
                        document.getElementById('password1').value = ''
                        document.getElementById('password2').value = ''
                        break;
                    case 500:
                        setPasswordStatus(500)
                        break;
                    default:
                        setProfileStatus(1)
                }
            })
        } else { return }
    }

    const displayAlert = () => {
        const alert = document.querySelector('.alert-div');
        alert.style.display = 'flex';
    }

    return (
        <div id="updateUser">
            <div className='form form-profile'>
                <form onSubmit={handleProfileUpdate}>
                    <fieldset>
                        <legend>Change Profile Information</legend>
                        <div>
                            <label htmlFor="fname">First Name&nbsp;&nbsp;</label>
                            <input type="text" id='fname' name="fname" maxLength='35' onChange={e => setfname(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="lname">Last Name&nbsp;&nbsp;</label>
                            <input type="text" id='lname' name="lname" maxLength='35' onChange={e => setlname(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="email">Email Address&nbsp;&nbsp;</label>
                            <input type="email" id='email' name="email" maxLength='35' onChange={e => setemail(e.target.value)} required />
                        </div>
                        {profileStatus === 500
                            ? <h3>Sorry, a server error has occurred</h3>
                            : null}
                        {profileStatus === 200
                            ? <h3>Profile information updated successfully</h3>
                            : null}
                        {profileStatus === 1
                            ? <h3>Something unexpected has occured</h3>
                            : null}
                        <button>Update</button>
                    </fieldset>
                </form>
                <form onSubmit={handlePasswordUpdate}>
                    <fieldset>
                        <legend>Change Password</legend>
                        <div>
                            <label htmlFor="password1">New Password&nbsp;&nbsp;</label>
                            <input type="password" id='password1' name="password1" maxLength='35' onChange={e => setpassword1(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="password2">Confirm Password&nbsp;&nbsp;</label>
                            <input type="password" id='password2' name="password2" maxLength='35' onChange={e => setpassword2(e.target.value)} required />
                        </div>
                        {passwordStatus === 500
                            ? <h3>Sorry, a server error has occurred</h3>
                            : null}
                        {passwordStatus === 200
                            ? <h3>Password updated successfully</h3>
                            : null}
                        {profileStatus === 1
                            ? <h3>Something unexpected has occured</h3>
                            : null}
                        <button>Update</button>
                    </fieldset>
                </form>
                <div id="delete_account">
                    <h3>Delete account</h3>
                    <button onClick={displayAlert}>Delete</button>
                </div>
            </div>
        </div>
    )
}
export default UpdateUser