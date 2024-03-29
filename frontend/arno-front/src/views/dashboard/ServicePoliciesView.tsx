import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";

import {
  ActionIcon,
  Button,
  Center,
  Group,
  Modal,
  NumberInput,
  Space,
  Table,
  Title,
  Text,
} from "@mantine/core";

import { Rating } from "react-simple-star-rating";
import { Edit, Plus, X } from "tabler-icons-react";

import { ScorePolicy } from "../../models";
import { ScoreAPI } from "../../api/score";

import { notifyUser } from "../utils";
import { useAppDispatch } from "../../redux/hooks";
import { useLocation } from "react-router-dom";
import {
  PolicySteps,
  ReportCSVStep,
  ReportFormSteps,
} from "../../assets/IntroSteps";
import { setSteps } from "../../redux/intro";
import { RatingFillColorArray } from "../../assets/consts";

import { Helmet } from "react-helmet";
const TITLE = "سیاست‌گذاری خدمت‌دهی";

const ServicePoliciesView = () => {
  const [policies, setPolicies] = useState<ScorePolicy[]>([]);
  const [toRemovePolicyID, setToRemovePolicyID] = useState<number | null>(null);
  const [toEditPolicy, setToEditPolicy] = useState<ScorePolicy | null>(null);
  const [policyFormModalOpened, setPolicyFormModalOpened] = useState(false);

  const [rating, setRating] = useState<number>(0);

  const getData = async () => {
    let res = await ScoreAPI.getInstance().getScorePolicies();
    if (res.success) {
      const data = (res.data! as ScorePolicy[]).sort(
        (a, b) => b.minimum_score - a.minimum_score
      );
      setPolicies(data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const editPolicy = async (values: any) => {
    const policy = toEditPolicy;
    values["minimum_score"] = rating;

    if (policy === null) {
      const res = await ScoreAPI.getInstance().createScorePolicy(values);
      notifyUser(
        res,
        "ثبت موفقیت‌آمیز",
        "سیاست ارائه خدمات با موفقیت ایجاد شد."
      );
    } else {
      const res = await ScoreAPI.getInstance().updateScorePolicy(
        policy!.id,
        values
      );
      notifyUser(
        res,
        "ویرایش موفقیت‌آمیز",
        "سیاست ارائه خدمات با موفقیت ویرایش شد."
      );
    }
    setPolicyFormModalOpened(false);
    setToEditPolicy(null);
    await getData();
  };

  const removePolicy = async () => {
    const res = await ScoreAPI.getInstance().deleteScorePolicy(
      toRemovePolicyID!
    );

    notifyUser(res, "حذف موفقیت‌آمیز", "معیار ارزیابی با موفقیت حذف شد.");

    if (res.success) {
      setToRemovePolicyID(null);
      await getData();
    }
  };

  let editPolicyForm = useForm({
    initialValues: {
      minimum_score: toEditPolicy?.minimum_score,
      allowed_requests: toEditPolicy?.allowed_requests,
    },
  });

  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard/service_policy") {
      dispatch(setSteps(PolicySteps));
    }
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Group position="apart">
        <Title order={2}>{TITLE}</Title>
        <Button
          className="tour-add-policy"
          variant="light"
          size="xs"
          color="violet"
          leftIcon={<Plus size={16} />}
          onClick={() => {
            setToEditPolicy(null);
            setRating(0);
            editPolicyForm.setFieldValue("allowed_requests", 0);
            setPolicyFormModalOpened(true);
          }}
        >
          افزودن سیاست جدید
        </Button>
      </Group>
      <Space h="lg" />

      <Center>
        <Table
          className="centered-table tour-policy-table"
          verticalSpacing="md"
          striped
          highlightOnHover
        >
          <thead>
            <tr>
              <th>ردیف</th>
              <th>حداقل امتیاز</th>
              <th>حداکثر تعداد خدمات هم‌زمان</th>
              <th>ویرایش/حذف</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((p, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <Rating
                    ratingValue={p.minimum_score}
                    size={30}
                    transition
                    allowHalfIcon
                    fillColorArray={RatingFillColorArray}
                    readonly={true}
                  />
                </td>
                <td>{p.allowed_requests}</td>
                <td>
                  <Group position="center">
                    <ActionIcon
                      onClick={() => {
                        editPolicyForm.setValues({
                          minimum_score: p.minimum_score,
                          allowed_requests: p.allowed_requests,
                        });
                        setToEditPolicy(p);
                        setRating(p.minimum_score);
                        setPolicyFormModalOpened(true);
                      }}
                    >
                      <Edit color={"#40bfa3"} size={22} />
                    </ActionIcon>
                    <ActionIcon
                      onClick={() => {
                        setToRemovePolicyID(p.id);
                      }}
                    >
                      <X color="red" size={22} />
                    </ActionIcon>
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Center>

      <Modal
        centered
        opened={toRemovePolicyID !== null}
        onClose={() => setToRemovePolicyID(null)}
        title="اخطار"
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        آیا از حذف این سیاست مطمئن هستید؟
        <Group position="right">
          <Button mt="sm" color="red" onClick={() => removePolicy()}>
            حذف
          </Button>
          <Button
            mt="sm"
            color="blue"
            onClick={() => setToRemovePolicyID(null)}
          >
            انصراف
          </Button>
        </Group>
      </Modal>

      <Modal
        centered
        opened={policyFormModalOpened}
        onClose={() => {
          setPolicyFormModalOpened(false);
          setToEditPolicy(null);
        }}
        title="افزودن/ویرایش محدودیت"
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <form onSubmit={editPolicyForm.onSubmit(editPolicy)}>
          <NumberInput
            label="تعداد خدمات هم‌زمان:"
            description="حداکثر تعداد خدمت هم‌زمان می‌تواند برابر با ۲۰ باشد."
            placeholder="تعداد خدمات"
            max={20}
            min={0}
            {...editPolicyForm.getInputProps("allowed_requests")}
          />
          <Space h="sm"/>
          <Text weight={500} size="sm">
            حداقل امتیاز برای این تعداد خدمت هم‌زمان:
          </Text>
          <Center>
            <Rating
              ratingValue={rating}
              onClick={setRating}
              initialValue={toEditPolicy?toEditPolicy.minimum_score:0}
              size={40}
              transition
              allowHalfIcon
              fillColorArray={RatingFillColorArray}
              readonly={false}
            />
          </Center>

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

export default ServicePoliciesView;
