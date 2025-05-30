Feature: Filling and submitting a form

  @form
  Scenario: Filling and submitting custom fields in the form
    Given the user "STUDENT-1" is on the form page
    And the user "STUDENT-1" has the following data:
      | firstName | lastName  | userName  | phoneNumber | gender |
      | Andrei    | Kanavalau | pass      | 1234567890  | Male   |
    When the user "STUDENT-1" fills in the required fields with this data
    And the user "STUDENT-1" submits the form
    Then the submitted form should contain the data for "STUDENT-1"
