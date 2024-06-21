# Job Application Form Documentation

## Overview

This document provides a detailed explanation of the Job Application Form built using React functional components and hooks. The form includes conditional fields, various input types, and comprehensive validation logic to ensure data integrity.

## Form Fields

1. **Full Name (Text)**
   - **Type**: Text
   - **Validation**: Required

2. **Email (Email)**
   - **Type**: Email
   - **Validation**: Required, must be a valid email format

3. **Phone Number (Number)**
   - **Type**: Text (validated as a number)
   - **Validation**: Required, must be a valid number

4. **Applying for Position (Dropdown)**
   - **Type**: Select
   - **Options**: Developer, Designer, Manager

5. **Relevant Experience (Number)**
   - **Type**: Number
   - **Visibility**: Visible if "Developer" or "Designer" is selected
   - **Validation**: Required if visible, must be a number greater than 0

6. **Portfolio URL (Text)**
   - **Type**: Text
   - **Visibility**: Visible if "Designer" is selected
   - **Validation**: Required if visible, must be a valid URL

7. **Management Experience (Text)**
   - **Type**: Textarea
   - **Visibility**: Visible if "Manager" is selected
   - **Validation**: Required if visible

8. **Additional Skills (Multiple checkboxes)**
   - **Type**: Checkbox
   - **Options**: JavaScript, CSS, Python, React, Node.js
   - **Validation**: At least one skill must be selected

9. **Preferred Interview Time (Date and Time Picker)**
   - **Type**: Datetime-local
   - **Validation**: Required, must be a valid date and time

## Conditional Logic

- **Relevant Experience**: Displayed if "Developer" or "Designer" is selected.
- **Portfolio URL**: Displayed if "Designer" is selected.
- **Management Experience**: Displayed if "Manager" is selected.

## Validation Logic

- **Full Name**: Must be provided.
- **Email**: Must be provided and follow a valid email format.
- **Phone Number**: Must be provided and be a valid number.
- **Relevant Experience**: Required if "Developer" or "Designer" is selected and must be greater than 0.
- **Portfolio URL**: Required if "Designer" is selected and must be a valid URL.
- **Management Experience**: Required if "Manager" is selected.
- **Additional Skills**: At least one skill must be selected.
- **Preferred Interview Time**: Must be provided and be a valid date and time.

## Form Submission

On submission, the form validates the inputs based on the criteria outlined above. If the validation passes, the form data is displayed as a JSON summary.

## Implementation Details

### `useFormValidation.js` (Custom Hook for Form Validation)

This custom hook manages the validation logic for the form.

```jsx
import { useState, useEffect } from 'react';

const useFormValidation = (formData, validate) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(validate(formData));
  }, [formData]);

  const validateForm = () => {
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return { errors, validateForm };
};

export default useFormValidation;
