import { FormKitTypeDefinition } from '@formkit/core'
import {
  createRplFormInput,
  defaultRplFormInputProps,
  inputLibrary,
  rplFeatures
} from './input-utils'

/**
 * Input definition for Ripple text input.
 * @public
 */
export const url: FormKitTypeDefinition = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: createRplFormInput({
    $cmp: 'RplFormInput',
    props: {
      ...defaultRplFormInputProps,
      type: 'url'
    }
  }),
  library: inputLibrary,
  /**
   * The type of node, can be a list, group, or input.
   */
  type: 'input',
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: 'text',
  /**
   * An array of extra props to accept for this input.
   */
  props: ['placeholder', 'validationMeta'],
  /**
   * Forces node.props.type to be this explicit value.
   */
  forceTypeProp: 'text',
  /**
   * Additional features that should be added to your input
   */
  features: rplFeatures
}
