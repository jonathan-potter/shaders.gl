const { ga } = window

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

  ga && ga('send', 'event', eventProperties)
}
