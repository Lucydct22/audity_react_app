import Select from 'react-select';
import { useState } from 'react';
import Spinner from '../../../UI/spinner/Spinner';
import './profileComponent.scss';
import StructureMainBComponent from '../structureMainBComponent/StructureMainBComponent';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';



const ProfileComponent = () => {

  const { t } = useTranslation();

  //const { user, setUser } = useContext(UserContext);

  const { user, isAuthenticated, isLoading } = useAuth0();

  if(isLoading){
return <StructureMainBComponent><Spinner /></StructureMainBComponent>
}

  const [userData, setUserData] = useState({
    email: user.email,
    password: '12345',
    username: user.nickname,
    birth_day: '14/07/1993',
    avatar: user.picture
  })

  const [editMode, setEditMode] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({ value: userData.country, label: userData.country });
  const [selectedLanguage, setSelectedLanguage] = useState({ value: userData.language, label: userData.language });



  const countries = [
    { value: 'Spain', label: t("profile_select_country_one") },
    { value: 'Canada', label: t("profile_select_country_two") },
    { value: 'United States', label: t("profile_select_country_three") }
  ];

  const languages = [
    { value: 'Spanish', label: t("profile_select_language_one") },
    { value: 'English', label: t("profile_select_language_two") }
  ];


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  }

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setUserData({
      ...userData,
      country: selectedOption.value,
    })
  }

  const handleLanguageChange = (selectedOption) => {
    selectedLanguage(selectedOption);
    setUserData({
      ...userData,
      language: selectedOption.value
    })
  }

  const handleChange = () => {
    setEditMode(true);
    //setUserData(userData.email: e.target.value)

  }

  const handleSave = () => {
    setEditMode(false);
  }


  return (
    <>
      <StructureMainBComponent>
        <div className='user-settings'>
          <div className="user-settings__image">
            <img src={user.picture} alt="your foto" className="user-settings-profile-foto" />
            <p>{t("profile_intro")}</p>
          </div>

          <div className="user-settings__account" >
            <span>{t('profile_account')}</span>
            <label >{t("profile_email")}</label>
            <div>
              <input type="email" value={userData.email} name="email" readOnly={!editMode} placeholder={user.email} onChange={handleInputChange} />
              
            </div>
            <label >{t("profile_password")}</label>
            <div>
              <input type="password" value={userData.password} name="password" readOnly={!editMode} placeholder="password" onChange={handleInputChange} />
            </div>
            <label >{t("profile_username")}</label>
            <div>
              <input type="text" value={userData.nickname} name="username" readOnly={!editMode} placeholder={user.nickname} onChange={handleInputChange} />
            </div>

          </div>
          <div className="user-settings__private-info" >

            <div className='user-settings__select-container'>

              <div className='user-settings__select-item'>
                <label >{t("profile_birthday")}</label>
                <div className="input-group">
                  <input type="date" className="input-group__bthd" value={userData.birth_day} name="birth_day" placeholder={user.birth_day} readOnly={!editMode} onChange={handleInputChange} />
                </div>
              </div>

              <div className='user-settings__select-item'>
                <label >{t("profile_country")}</label>
                <div className="input-group">
                  <Select
                  width='200px'
                    options={countries}
                    value={selectedCountry}
                    placeholder={countries[0]}
                    defaultValue={"selectedCountry"}
                    isDisabled={!editMode}
                    onclick={handleChange}
                    onChange={(value) => setSelectedCountry(value)}
                    className="user-settings__select-item--select"
                    classNamePrefix="dropdown-input"
                  />
                </div>
              </div>

              <div className='user-settings__select-item'>
                <label >{t("profile_language")}</label>
                <div className="input-group">
                  <Select
                    options={languages}
                    value={selectedLanguage}
                    defaultValue={languages[1]}
                    isDisabled={!editMode}
                    onChange={(value) => setSelectedLanguage(value)}
                    className="user-settings__select-item--select"
                    classNamePrefix="dropdown-input"
                  />
                </div>
              </div>
            </div>
            {editMode ? <button onClick={handleSave} className='user-settings__btn--save'>{t("profile_btn_save")}</button> : <button onClick={handleChange} className='user-settings__btn--modify'>{t("profile_btn_change")}</button>}
            <button className='user-settings__btn--delete'>{t('profile_btn_delete')}</button>
          </div>
        </div>
      </StructureMainBComponent>
    </>

  )
}
export default ProfileComponent;