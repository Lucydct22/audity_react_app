import Select from 'react-select';
import { useContext, useState } from 'react';
import Spinner from '../../../UI/spinner/Spinner';
import './profileComponent.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import UserContext from 'context/user/UserContext';
import { LanguageContext, languages } from 'context/language/LanguageContext';
import PersonPlaceholder160 from 'assets/img/webp/profile-placeholder-160x160.webp'


export default function ProfileComponent() {
  const { t } = useTranslation();
  const { isLoading, getIdTokenClaims } = useAuth0();
  const [editMode, setEditMode] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState();
  //const [selectedLanguage, setSelectedLanguage] = useState();
  const { dbUser, updateUserCountry } = useContext(UserContext)
  const { language, setLanguageAction } = useContext(LanguageContext)

  if (isLoading) {
    return <Spinner />
  }

  const countries = [
    { value: 'Spain', label: t("profile_select_country_one") },
    { value: 'Canada', label: t("profile_select_country_two") },
    { value: 'United States', label: t("profile_select_country_three") }
  ];

  const handleInputChange = (e: any) => {
    /*const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });*/
  }

  const handleChange = () => {
    setEditMode(true);
  }

  const handleSave = () => {
    setEditMode(false);
  }

  return (
    <div className='user-settings'>
      <div className="user-settings__profile">
        <img src={dbUser?.picture ? dbUser.picture : PersonPlaceholder160} alt="your photo" className="user-settings__profile--image" />
        <div className="user-settings__profile--info">
          <p className="user-settings__profile--info__name">{dbUser.name}</p>
          <p className="user-settings__profile--info__desc">{t("profile_intro")}</p>
        </div>
      </div>
      <div className="user-settings__account" >
        <span>{t('profile_account')}</span>
        <label >{t("profile_email")}</label>
        <div>
          <input type="email" value={dbUser.email} name="email" readOnly={!editMode} placeholder={dbUser.email} onChange={handleInputChange} />
        </div>
        <label >{t("profile_name")}</label>
        <div>
          <input type="text" value={dbUser.name} name="username" readOnly={!editMode} placeholder={dbUser.name} onChange={handleInputChange} />
        </div>
        <label >{t("profile_lastname")}</label>
        <div>
          <input type="text" value={dbUser.lastname} name="username" readOnly={!editMode} placeholder={dbUser.lastname} onChange={handleInputChange} />
        </div>
        <label >{t("profile_username")}</label>
        <div>
          <input type="text" value={dbUser.nickname} name="username" readOnly={!editMode} placeholder={dbUser.nickname} onChange={handleInputChange} />
        </div>
      </div>
      <div className="user-settings__private-info" >
        <div className='user-settings__select-container'>
          <div className='user-settings__select-item'>
            <label >{t("profile_birthday")}</label>
            <div className="input-group">
              <input type="date" className="input-group__bthd" value={dbUser.dateOfBirth  || ''} name="birth_day" placeholder={dbUser.dateOfBirth || ''} readOnly={!editMode} onChange={handleInputChange} />
            </div>
          </div>
          <div className='user-settings__select-item'>
            <label >{t("profile_country")}</label>
            <div className="input-group">
              <Select
                options={countries}
                value={selectedCountry}
                placeholder={dbUser.country}
                isDisabled={!editMode}
                onChange={(option: any) => updateUserCountry(option.value)}
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
                //value={languages}
                //defaultValue={dbUser.language}
                placeholder={language === 'es' ? t("profile_select_language_one") : t("profile_select_language_two")}
                isDisabled={!editMode}
                onChange={(e: any) => setLanguageAction(e.code)}
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
  )
}