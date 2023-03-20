import Select from 'react-select';
import { useState } from 'react';
import './profileComponent.scss'

const ProfileComponent = () => {

  //const { user, setUser } = useContext(UserContext);

  const [user, setUser] = useState({ email: '', password: '', username: '', birth_day: '' })
  const [editMode, setEditMode] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const countries = [
    { value: 'Spain', label: 'Spain' },
    { value: 'Canada', label: 'Canada' },
    { value: 'United States', label: 'United States' }
  ];

  const languages = [
    { value: 'Spanish', label: 'Spanish' },
    { value: 'English', label: 'English' }
  ];


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  }

  const handleCountryChange = (value) => {
    setUser({
      ...user,
      country: value,

    })
  }

  const handleLanguageChange = (value) => {
    setUser({
      ...user,
      language: value

    })
  }

  const handleChange = () => {
    setEditMode(true);
  }

  const handleSave = () => {
    setEditMode(false);
  }


  return (
    <div className='user-settings'>
      <div className="user-settings__image">
        <img src="" alt="your foto" className="user-settings-profile-foto" />
        <p>You're inside your personal details</p>
      </div>

      <div className="user-settings__account" >
        <span>Audity account</span>
        <label >Your email</label>
        <div>
        <input type="email" value={user.email} name="email" readOnly={!editMode} placeholder="email" onChange={handleInputChange} />
        {editMode ? <button onClick={handleSave}>Save</button> : <button onClick={handleChange}>Change</button>}
        </div>
        <label >Your password</label>
        <div>
        <input type="password" value={user.password} name="password" readOnly={!editMode} placeholder="password" onChange={handleInputChange} />
        {editMode ? <button onClick={handleSave}>Save</button> : <button onClick={handleChange}>Change</button>}
        </div>
        <label >Username</label>
        <div>
        <input type="text" value={user.username} name="username" readOnly={!editMode} placeholder="username" onChange={handleInputChange} />
        {editMode ? <button onClick={handleSave}>Save</button> : <button onClick={handleChange}>Change</button>}
        </div>

      </div>
      <div className="user-settings__private-info" >
        <label >Date of birth</label>
        <div>
        <input type="date" value={user.birth_day} name="birth_day" placeholder="user.birth_day" readOnly={!editMode} onChange={handleInputChange} />
        {editMode ? <button onClick={handleSave}>Save</button> : <button onClick={handleChange}>Change</button>}
        </div>

        <label >Country</label>
        <Select
          options={countries}
          value={countries[2]}
          defaultValue={languages[1]}
          isDisabled={!editMode}
          onclick={handleChange}
          onChange={(value) => setSelectedCountry(value)}
          className="select"
        />
        {editMode ? <button onClick={handleSave}>Save</button> : <button onClick={handleChange}>Change</button>}
       

        <label >Language</label>
        <Select
          options={languages}
          value={languages[1]}
          defaultValue={languages[1]}
          isDisabled={!editMode}
          onChange={(value) => setSelectedLanguage(value)}
          className="select"
        />
        {editMode ? <button onClick={handleSave}>Save</button> : <button onClick={handleChange}>Change</button>}
       
      </div>
      <button className='user-settings__btn-delete'>Delete profile</button>
    </div>

  )
}
export default ProfileComponent;