const email = {
  id: '581972ee-0b67-47e4-9c03-d985b2a1e06c',
  body: `An inspection at {{asset}} was conducted on {{date}}.

Action is required by your Club to rectify issues found during the inspection.

To view the issues requiring attention by your Club, log onto the Reserves Manager program and click on the outstanding issues tab.

Issues that require attention by Council are also displayed for your information only.

Once issues have been resolved please mark them as complete in the program and council will be advised.

Go to <a href="{{website}}">{{website}}</a> for more information.`,
  name: 'Inspection completion - containing summary of issues found (sent to clubs)	',
  reference: 'inspection_completion',
  subject: 'Summary report for inspection of {{asset}}',
}

export default email
