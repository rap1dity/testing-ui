Feature: Selecting checkboxes

  @checkboxes
  Scenario Outline: Selecting a checkbox and verifying it is selected
    Given the user "<user>" wants to select the checkbox "<label>"
    When I select the checkbox for "<user>"
    Then the checkbox result should be equal to "<result>"

    Examples:
      | user      | label      | result                                   |
      | STUDENT-1 | Notes      | notes                                    |
      | STUDENT-2 | Angular    | angular                                  |
      | STUDENT-3 | Office     | office public private classified general |
      | STUDENT-4 | Commands   | commands                                 |
      | STUDENT-5 | React      | react                                    |
