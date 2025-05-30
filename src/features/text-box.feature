Feature: Filling and submitting text box form

  @text-box
  Scenario: Filling and submitting custom data in the text box form
    Given the user "STUDENT-1" is on the text box page
    And the user "STUDENT-1" has the following text box data:
      | name              | email                   | current           | permanent           |
      | Andrei Kanavalau  | timeworstseal@gmail.com | Street 1, City    | Street 2, City      |
    When the user "STUDENT-1" fills in the text box form with this data
    Then the output should contain the data for "STUDENT-1"
