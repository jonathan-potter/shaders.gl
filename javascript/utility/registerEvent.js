export default function registerEvent ({ category, action, label, value }) {
  // TODO: change how categories work
  if (!action) {
    throw new Error('GA requires category and action')
  }

  const eventProperties = {
    eventCategory: category,
    eventAction: action
  }

  if (label) { eventProperties.eventLabel = label }
  if (value) { eventProperties.eventValue = value }

  /* eslint-disable no-undef */
  ga('send', 'event', eventProperties)
  /* eslint-enable no-undef */
}
