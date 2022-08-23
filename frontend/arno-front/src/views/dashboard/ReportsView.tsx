import "dayjs/locale/fa";

import {useEffect, useState} from "react";

import {
  Button,
  Center,
  Grid,
  Select,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import {useForm} from "@mantine/form";
import {showNotification} from "@mantine/notifications";
import {Download, ListSearch, X} from "tabler-icons-react";

import {LogAPI} from "../../api/log";
import {SystemLog, LogLevel} from "../../models";

import {DateRangePicker} from "@mantine/dates";
import {CSVLink} from "react-csv";
import {ObjectSerializer} from "../../assets/ObjectSerializer";
import {APIDataToLogs} from "../../models/utils";

import {Helmet} from "react-helmet";
import {setSteps} from "../../redux/intro";
import {EvalMetricSteps, ReportCSVStep, ReportFormSteps} from "../../assets/IntroSteps";
import {useAppDispatch} from "../../redux/hooks";
import {useLocation} from "react-router-dom";

const TITLE = "گزارشات فنی سیستم";

const ReportsView = () => {
  const [data, setData] = useState<SystemLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchSuccess, setFetchSuccess] = useState<boolean>(false);
  const [startTimeInterval, setStartTimeInterval] = useState<[Date | null, Date | null]>([new Date(), new Date()]);

  const searchForm = useForm({
    initialValues: {
      source: "",
      message: "",
      level: LogLevel.Critical,
    },
  });

  const getLogs = async (values: any) => {
    setIsLoading(true);
    const query = {
      ...values,
      created_at_gte: startTimeInterval[0],
      created_at_lte: startTimeInterval[1],
    };
    const res = await LogAPI.getInstance().getLogs(query);
    setIsLoading(false);
    if (res.success) {
      const logs = APIDataToLogs(res);
      setData(logs);
      setFetchSuccess(true);
      if (logs.length === 0) {
        showNotification({
          title: "خطا",
          message: "گزارشی با این مشخصات یافت نشد",
          color: "red",
          icon: <X size={18}/>,
        });
      }
    } else {
      showNotification({
        title: "خطا",
        message: "دریافت لاگ‌ها از سرور با خطا مواجه شد",
        color: "red",
        icon: <X size={18}/>,
      });
    }
  };

  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard/report") {
      let steps = []
      steps.push(...ReportFormSteps)
      if (fetchSuccess && data.length) {
        steps.push(ReportCSVStep)
      }
      dispatch(setSteps(steps))
    }
  }, [location.pathname, fetchSuccess, data]);

  return (
      <>
        <Helmet>
          <title>{"آرنو | " + TITLE}</title>
        </Helmet>
        <Title order={2}>{TITLE}</Title>
        <form onSubmit={searchForm.onSubmit(getLogs)} className="tour-report-form">
          <DateRangePicker
              className="tour-report-date"
              locale="fa"
              label="بازه‌ی گزارشات"
              description="زمان شروع و پایان ثبت گزارشات را انتخاب کنید:"
              placeholder="انتخاب بازه‌ی زمانی"
              value={startTimeInterval}
              onChange={setStartTimeInterval}
          />
          <Grid>
            <Grid.Col span={3}>
              <Select className="tour-report-type"
                      mt="sm"
                      label="نوع لاگ"
                      description="لطفا یک مورد را انتخاب کنید:"
                      data={[
                        {value: LogLevel.Debug, label: "رفع خطا"},
                        {value: LogLevel.Info, label: "اطلاعات"},
                        {value: LogLevel.Warning, label: "هشدار"},
                        {value: LogLevel.Error, label: "خطا"},
                        {value: LogLevel.Critical, label: "بحرانی"},
                      ]}
                      {...searchForm.getInputProps("level")}
              />
            </Grid.Col>
            <Grid.Col span={9}>
              <TextInput className="tour-report-source"
                         mt="sm"
                         label="مبدأ لاگ"
                         description="بخشی از نام مبدأ لاگ:"
                         placeholder="عبارتی که source لاگ شامل آن باشد"
                         {...searchForm.getInputProps("source")}
              />
            </Grid.Col>
          </Grid>
          <TextInput className="tour-report-message"
                     mt="sm"
                     label="پیام لاگ"
                     placeholder="بخشی از پیام لاگ"
                     {...searchForm.getInputProps("message")}
          />
          <Center>
            <Button className="tour-report-submit"
                    mt="sm"
                    color="lime"
                    leftIcon={<ListSearch size={20}/>}
                    type="submit"
                    loading={isLoading}
            >
              جست‌وجوی گزارشات
            </Button>
          </Center>
          <Space h="sm"/>
          <Center>
            {fetchSuccess && data.length > 0 && (
                <CSVLink
                    filename={`System Logs Report ${new Date().toDateString()}.csv`}
                    data={ObjectSerializer.serializeData(data)}
                    target="_blank"
                >
                  <Button
                      className="tour-report-csv"
                      variant="gradient"
                      gradient={{from: "cyan", to: "indigo", deg: 105}}
                      leftIcon={<Download size={20}/>}
                  >
                    {`دریافت ${data.length} رکورد`}
                  </Button>
                </CSVLink>
            )}
          </Center>
        </form>
      </>
  );
};

export default ReportsView;
