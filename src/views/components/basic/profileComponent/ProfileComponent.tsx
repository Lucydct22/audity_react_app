import Select from 'react-select';
import { useContext, useEffect, useState } from 'react';
import Spinner from '../../../UI/spinner/Spinner';
import './profileComponent.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import TrackListComponent from "views/components/basic/trackListComponent/TrackListComponent";
import UserContext from 'context/user/UserContext';

export default function ProfileComponent () {
  const { t } = useTranslation();
  const { user: userAuth0, isLoading, getIdTokenClaims } = useAuth0();
  const [editMode, setEditMode] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState();
  const { user } = useContext(UserContext)

  //use context of user to get data from db  

  if (isLoading) {
    return <Spinner />
  }

  // if (!userAuth0) return

  // const { picture } = userAuth0;
  const { email, nickname } = user;

  const userData = {
    email: email,
    password: '12345',
    nickname: nickname,
    birth_day: '1993-07-14',
    picture: user?.picture
  };

  const countries = [
    { value: 'Spain', label: t("profile_select_country_one") },
    { value: 'Canada', label: t("profile_select_country_two") },
    { value: 'United States', label: t("profile_select_country_three") }
  ];

  const languages = [
    { value: 'Spanish', label: t("profile_select_language_one") },
    { value: 'English', label: t("profile_select_language_two") }
  ];

  const handleInputChange = (e: any) => {
    /*const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });*/
  }

  const handleCountryChange = (selectedOption: any) => {
    setSelectedCountry(selectedOption);
    /*setUserData({
      ...userData,
      country: selectedOption.value,
    })*/
  }

  const handleLanguageChange = (selectedOption: any) => {
    if (!selectedOption) return
    setSelectedLanguage(selectedOption);
    /*setUserData({
      ...userData,
      language: selectedOption.value
    })*/
  }

  const handleChange = () => {
    setEditMode(true);
  }

  const handleSave = () => {
    setEditMode(false);
  }

  return (
    <>
      <div className='user-settings'>
        <div className="user-settings__image">
          <img src={userData.picture} alt="your foto" className="user-settings__image--profile" />
          <p>{t("profile_intro")}</p>
        </div>
        <div className="user-settings__account" >
          <span>{t('profile_account')}</span>
          <label >{t("profile_email")}</label>
          <div>
            <input type="email" value={userData.email} name="email" readOnly={!editMode} placeholder={userData.email} onChange={handleInputChange} />
          </div>
          <label >{t("profile_password")}</label>
          <div>
            <input type="password" value={userData.password} name="password" readOnly={!editMode} placeholder="password" onChange={handleInputChange} />
          </div>
          <label >{t("profile_username")}</label>
          <div>
            <input type="text" value={userData.nickname} name="username" readOnly={!editMode} placeholder={userData.nickname} onChange={handleInputChange} />
          </div>
        </div>
        <div className="user-settings__private-info" >
          <div className='user-settings__select-container'>
            <div className='user-settings__select-item'>
              <label >{t("profile_birthday")}</label>
              <div className="input-group">
                <input type="date" className="input-group__bthd" value={userData.birth_day} name="birth_day" placeholder={userData.birth_day} readOnly={!editMode} onChange={handleInputChange} />
              </div>
            </div>
            <div className='user-settings__select-item'>
              <label >{t("profile_country")}</label>
              <div className="input-group">
                <Select
                  options={countries}
                  value={selectedCountry}
                  placeholder={countries[0].value}
                  isDisabled={!editMode}
                  // onclick={handleChange}
                  onChange={(value: any) => setSelectedCountry(value)}
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
                  placeholder={languages[0].value}
                  isDisabled={!editMode}
                  onChange={(value: any) => setSelectedLanguage(value)}
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
      <TrackListComponent />
    </>
  )
}
// export default ProfileComponent;