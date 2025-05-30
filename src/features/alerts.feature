@alerts
Feature: Alerts
  Scenario: Handling simple alert
    Given the user "STUDENT-1" is on the alerts page
    When the user clicks the "alertButton"
    Then the alert with message "You clicked a button" should be shown and accepted

  Scenario: Handling timer alert
    Given the user "STUDENT-2" is on the alerts page
    When the user clicks the "timerAlertButton"
    Then the alert with message "This alert appeared after 5 seconds" should be shown and accepted

  Scenario: Handling confirm alert
    Given the user "STUDENT-3" is on the alerts page
    When the user clicks the "confirmButton"
    Then the alert with message "Do you confirm action?" should be shown and accepted
    And the confirmation result should be "You selected Ok"

  Scenario: Handling prompt alert with input
    Given the user "STUDENT-4" is on the alerts page
    When the user clicks the "promptButton" and enters "Playwright"
    Then the alert with message "Please enter your name" should be shown and accepted
    And the prompt result should be "You entered Playwright"
