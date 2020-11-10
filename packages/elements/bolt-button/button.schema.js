module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Button',
  description: 'A graphical element that indicates interactivity.',
  type: 'object',
  required: ['content'],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    content: {
      type: 'object',
      description: 'Content of the button.',
    },
    hierarchy: {
      type: 'string',
      description:
        'Style the button appropriately based on information hierarchy.',
      default: 'primary',
      enum: ['primary', 'secondary', 'tertiary', 'transparent'],
    },
    size: {
      type: 'string',
      description: 'Control the font-size and padding of the button.',
      default: 'medium',
      enum: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
    },
    width: {
      type: 'string',
      description: 'Control the width of the button.',
      default: 'auto',
      enum: ['auto', 'full', 'full@until-small'],
    },
    border_radius: {
      type: 'string',
      description: 'Control the border radius of the button.',
      default: 'small',
      enum: ['small', 'large', 'full'],
    },
    icon_only: {
      type: 'object',
      description:
        'Append an icon to the button content and visually hide the text content.',
    },
    icon_before: {
      type: 'object',
      description:
        'Append an icon before the button content. Icon component is recommended, however, &lt;img&gt; elements are also acceptable.',
    },
    icon_after: {
      type: 'object',
      description:
        'Append an icon after the button content. Icon component is recommended, however, &lt;img&gt; elements are also acceptable.',
    },
    link: {
      type: 'boolean',
      description: 'Set the semantic HTML tag to &lt;a&gt;.',
      default: false,
    },
  },
};
