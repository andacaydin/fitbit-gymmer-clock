function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Clockface style</Text>}>
       <Select
        label={`Selection`}
        settingsKey="clock_style"
        options={[
          {name:"Size 0 french model thin"},
          {name:"normal"},
          {name:"Super size me Adam!"}
        ]}
      />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);