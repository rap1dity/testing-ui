Feature: Selecting radio buttons

  @radio
  Scenario Outline: Selecting a radio button and verifying it is selected
    Given the user "<user>" wants to select the radio option "<option>"
    When I select the radio button for "<user>"
    Then the selected radio option should match stored value for "<user>"

    Examples:
      | user      | option    |
      | STUDENT-1 | Yes       |
      | STUDENT-2 | Impressive |
