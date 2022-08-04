import { useEffect, useState } from "react";

import {
  Table,
  Title,
  Avatar,
  Space,
  Group,
  ActionIcon,
  Modal,
  Button,
  Textarea,
  Input,
  Radio,
  RadioGroup,
} from "@mantine/core";
import {
  X,
  Check,
  ListSearch,
  Search,
  Paperclip,
  BellRinging,
  Checks,
  Edit,
  Send,
} from "tabler-icons-react";

import { useAppSelector } from "../../redux/hooks";
import { Chat, Metric, UserRole } from "../../models";

import { Helmet } from "react-helmet";
import { APIDataToChats, APIDataToMetrics } from "../../models/utils";
import { formatDateString } from "../../dateUtils";
import { useNavigate } from "react-router-dom";
import { ChatsAPI } from "../../api/chats";
import { SystemFeedbackAPI } from "../../api/feedback";
import { MetricsAPI } from "../../api/metrics";
import { RoleDict } from "../../assets/consts";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/hooks";

const TITLE = "معیارهای ارزیابی";

const EvalMetricsView = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [toRemoveMetricID, setToRemoveMetricID] = useState<number | null>(null);
  const [toEditMetric, setToEditMetric] = useState<Metric | null>(null);
  const [metricFormModalOpened, setMetricFormModalOpened] = useState(false);

  const getData = async () => {
    let res = await MetricsAPI.getInstance().get([]);
    console.log(res);
    if (res.success) {
      const data = APIDataToMetrics(res);
      setMetrics(data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const editMetric = (values: any) => {
    const metric = toEditMetric;
    console.log(values);

    if (metric === null) 
    {

    }



    //todo call back

    setToEditMetric(null);
    setMetricFormModalOpened(false);
    getData();
    showNotification({
      title: "عملیات موفقیت‌آمیز",
      message: "معیار ارزیابی با موفقیت اضافه/ویرایش شد.",
      color: "teal",
      icon: <Check size={18} />,
    });
  };

  const removeMetric = () => {
    const id = toRemoveMetricID;
    console.log("remove ", id);

    //todo call back

    setToRemoveMetricID(null);
    getData();
    showNotification({
      title: "حذف موفقیت‌آمیز",
      message: "معیار ارزیابی با موفقیت حذف شد.",
      color: "teal",
      icon: <Check size={18} />,
    });
  };

  let editMetricForm = useForm({
    initialValues: {
      title: toEditMetric?.title,
      description: "",
      userType: "",
    },
  });

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Group position="apart">
        <Title order={2}>{TITLE}</Title>
        <Button variant="light" size="xs" color="violet" onClick={()=>{
          setMetricFormModalOpened(true)
        }}>
          افزودن معیار جدید
        </Button>
      </Group>
      <Space h="lg" />
      <Table striped verticalSpacing="lg">
        <thead>
          <tr>
            <th>ردیف</th>
            <th>عنوان</th>
            <th>توضیحات</th>
            <th>نقش مربوطه</th>

            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((m, i) => {
            return (
              <tr key={i}>
                <td>{m.id}</td>
                <td>{m.title}</td>
                <td>{m.description}</td>
                <td>{RoleDict[m.userType]}</td>
                <td>
                  <Group>
                    <ActionIcon
                      onClick={() => {
                        editMetricForm.setValues({
                          title: m.title,
                          description: m.description,
                          userType: m.userType,
                        });
                        setToEditMetric(m);
                        setMetricFormModalOpened(true);
                      }}
                    >
                      <Edit color={"#40bfa3"} size={22} />
                    </ActionIcon>
                    <ActionIcon
                      onClick={() => {
                        setToRemoveMetricID(m.id);
                      }}
                    >
                      <X color="red" size={22} />
                    </ActionIcon>
                  </Group>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal
        centered
        opened={toRemoveMetricID !== null}
        onClose={() => setToRemoveMetricID(null)}
        title="اخطار"
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        آیا از حذف معیار مطمئن هستید؟
        <Group position="right">
          <Button mt="sm" color="red" onClick={() => removeMetric()}>
            حذف
          </Button>
          <Button
            mt="sm"
            color="blue"
            onClick={() => setToRemoveMetricID(null)}
          >
            انصراف
          </Button>
        </Group>
      </Modal>

      <Modal
        centered
        opened={metricFormModalOpened}
        onClose={() => setMetricFormModalOpened(false)}
        title="افزودن/ویرایش معیار"
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <form onSubmit={editMetricForm.onSubmit(editMetric)}>
          <Input
            mt="sm"
            placeholder="عنوان"
            required
            {...editMetricForm.getInputProps("title")}
          />
          <Textarea
            mt="sm"
            placeholder="توضیحات معیار"
            label="توضیحات"
            autosize
            minRows={4}
            maxRows={6}
            required
            {...editMetricForm.getInputProps("description")}
          />
          <RadioGroup
            mb="sm"
            label="کاربر مربوطه"
            description="مشخص کنید معیار در نظرسنجی کدام کاربر مورد استفاده قرار گیرد."
            spacing="xl"
            color="cyan"
            {...editMetricForm.getInputProps("userType")}
            required
          >
            <Radio value={UserRole.Customer} label="مشتری" />
            <Radio value={UserRole.Specialist} label="متخصص" />
          </RadioGroup>
          <Group position="right">
            <Button mt="md" color="blue" type="submit">
              ثبت
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default EvalMetricsView;
