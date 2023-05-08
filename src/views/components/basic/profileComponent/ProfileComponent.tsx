import Select from 'react-select';
import { useContext, useState } from 'react';
import Spinner from '../../../UI/spinner/Spinner';
import './profileComponent.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import UserContext from 'context/user/UserContext';
import { LanguageContext, languages } from 'context/language/LanguageContext';
import PersonPlaceholder160 from 'assets/img/webp/profile-placeholder-160x160.webp'
import moment from 'react-moment'

export default function ProfileComponent() {
  const { t } = useTranslation();
  const { isLoading, getIdTokenClaims } = useAuth0();
  const [editMode, setEditMode] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState();
  const { language, setLanguageAction } = useContext(LanguageContext)

  const { dbUser, updateUserCountry, updateUserSettings } = useContext(UserContext)

  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [nickname, setNickname] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')

  /*const dateString = dbUser.dateOfBirth;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'});*/

  useEffect(() => {
    setName(dbUser.name),
      setLastname(dbUser.lastname)
    setNickname(dbUser.nickname)
    setDateOfBirth(dbUser.dateOfBirth)
  }, [dbUser.name, dbUser.lastname, dbUser.nickname, dbUser.dateOfBirth]);

  if (isLoading) {
    return <Spinner />
  }

  const countries = [
    { value: 'Spain', label: t("profile_select_country_one") },
    { value: 'Canada', label: t("profile_select_country_two") },
    { value: 'United States', label: t("profile_select_country_three") }
  ];


  const handleChange = () => {
    setEditMode(true);
  }

  const handleSave = () => {
    setEditMode(false);
    updateUserSettings(name, lastname, nickname, dateOfBirth)
  }

  return (
    <>
      <div className='user-settings'>
        <div className="user-settings__image">
          <img src={dbUser.picture} alt="your photo" className="user-settings__image--profile" />
          <p>{t("profile_intro")}</p>
        </div>
        <div className="user-settings__account" >
          <span>{t('profile_account')}</span>
          <label >{t("profile_email")}</label>
          <div>
            <input type="email" value={dbUser.email} name="email" readOnly placeholder={dbUser.email} />
          </div>
          <label >{t("profile_name")}</label>
          <div>
            <input type="text" value={name} name="username" readOnly={!editMode} placeholder={t('profile_placeholder_name') || ''} onChange={(e: any) => setName(e.target.value)} />
          </div>
          <label >{t("profile_lastname")}</label>
          <div>
            <input type="text" value={lastname} name="username" readOnly={!editMode} placeholder={t('profile_placeholder_lastname') || ''} onChange={(e: any) => setLastname(e.target.value)} />
          </div>
          <label >{t("profile_username")}</label>
          <div>
            <input type="text" value={nickname} name="username" readOnly={!editMode} placeholder={t('profile_placeholder_nickname') || ''} onChange={(e: any) => setNickname(e.target.value)} />
          </div>
        </div>
        <div className="user-settings__private-info" >
          <div className='user-settings__select-container'>
            <div className='user-settings__select-item'>
              <label >{t("profile_birthday")}</label>
              <div className="input-group">
                <input
                  type="date"
                  className="input-group__bthd"
                  value={dateOfBirth || ''}
                  name="birth_day"
                  placeholder={t('profile_placeholder_birth_day') || ''}
                  readOnly={!editMode}
                  onChange={(e: any) => setDateOfBirth(e.target.value)} />
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
          <button className='user-settings__btn--password'>{t('profile_btn_password')}</button>
          <button className='user-settings__btn--delete'>{t('profile_btn_delete')}</button>
        </div>
      </div>
    </>
  )
}
