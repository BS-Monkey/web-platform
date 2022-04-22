interface IThresholdv2 {
    IntegrationID?: string;
    AlertID?: string;
    readonly Name: string;
    Subject: string;
    Notes: string;
    Type: string;
    Enabled: boolean;
    ValidationState: string;
    ValidationDetails: string;
}

type Thresholdv2<T> = T & IThresholdv2;

interface CloudwatchRegular {
    readonly Type: 'cloudwatch_regular_fluxtask';
    Metadata: {
        Component: string;
        CritPeriodMap: string; // JSON string
        CritThreshMap: string; // JSON string
        WarnPeriodMap: string; // JSON string
        WarnThreshMap: string; // JSON string
        ExclusionFilter: string;
        WhitelistFilter: string;
        Measurement: string;
        MetricField: string;
    };
}

type AnyThresholdsv2 =
    | CloudwatchRegular;

interface ValidateThresh {
    validationstate: string;
    validationdetails: string;
}
