import React from 'react'
import PropTypes from 'prop-types'
import MailingFormManager from 'modules/mailing-form-manager'
import moon from 'assets/graphics/moon_1.0.png'
import Arrow from 'assets/icons/arrow.svg'
import SuccessMessage from './components/success-message'
import s from './index.scss'
import appConfig from 'app.config.js'
const { STATUS } = MailingFormManager

IntegratedMailingSignup.propTypes = {
  className: PropTypes.string,
  backgroundImage: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  successComponent: PropTypes.node.isRequired
}

IntegratedMailingSignup.SuccessMessage = SuccessMessage

console.log(appConfig.campaignMonitor.id)

const fields = {
  email: {
    id: 'cm-skjjhl-skjjhl',
    value: ''
  }
}

// A copy of fields with the {<id>: <value>, ...} key value pairs
// for mailing manager's use
const fieldPairs = Object.values(fields).reduce(
  (pairs, { id, value }) => ({ ...pairs, [id]: value }),
  {}
)

export default function IntegratedMailingSignup({
  className = '',
  backgroundImage = `url(${moon})`,
  title,
  description,
  successComponent,
  ...rest
}) {
  return (
    <MailingFormManager
      fields={fieldPairs}
      id={appConfig.campaignMonitor.id}
      emailId={fields.email.id}
    >
      {({ managedFields, managedSubmit, status, message }) => {
        const { [fields.email.id]: email } = managedFields

        let emailErrorMessage = status === STATUS.ERROR ? message : ''
        return (
          <section className={`${s['container']} ${className}`}>
            <div className={s['background-container']}>
              <div className={s['background']} style={{ backgroundImage }} />
            </div>
            {status === STATUS.SUCCESS ? (
              successComponent
            ) : (
              <div className={`${s['display']}`}>
                <h3 className={`${s['title']} h1`}>{title}</h3>
                <p className={s['description']}>{description}</p>
                <form className={s['form']} onSubmit={managedSubmit}>
                  <div className={s['email-wrapper']}>
                    <input
                      type="text"
                      id={fields.email.id}
                      name={fields.email.id}
                      value={email.value}
                      onChange={({ target }) => email.onChange(target.value)}
                      className={`${s['email-input']} ${fields.email.id}`}
                      placeholder="Your Favorite Email"
                    />
                    {emailErrorMessage.length > 0 && (
                      <span className={s['email-error']}>
                        {emailErrorMessage}
                      </span>
                    )}
                  </div>
                  <button className={s['submit']} type="submit">
                    <Arrow className={s['submit-arrow']} />
                  </button>
                </form>
              </div>
            )}
          </section>
        )
      }}
    </MailingFormManager>
  )
}
