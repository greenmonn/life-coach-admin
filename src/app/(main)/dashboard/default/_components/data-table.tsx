import { fetchParticipants, type GroupType } from "./crm.config";
import { DataTableClient } from "./data-table-client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export async function DataTable() {
    const participantDataIG = await fetchParticipants("chat");
    const participantDataCG = await fetchParticipants("nochat");
    // return <><DataTableClient data={participantData} /></>;
    return <Tabs defaultValue="participants_intervention" className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select defaultValue="participants_intervention">
          <SelectTrigger className="flex w-fit @4xl/main:hidden" size="sm" id="view-selector">
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="participants_intervention">참여자 목록 (개입집단)</SelectItem>
            <SelectItem value="participants_control">참여자 목록 (대조집단)</SelectItem>
            <SelectItem value="conversation_list">챗봇 대화 목록</SelectItem>
            <SelectItem value="control_responses">대조 집단 응답</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="participants_intervention">
            개입 집단 참여자 <Badge variant="secondary">{participantDataIG.length}</Badge>
          </TabsTrigger> 
          <TabsTrigger value="participants_control">
            대조 집단 참여자 <Badge variant="secondary">{participantDataCG.length}</Badge>
          </TabsTrigger>
          {/* <TabsTrigger value="conversation_list">
            챗봇 대화 목록
          </TabsTrigger>
          <TabsTrigger value="control_responses">
            대조 집단 응답
          </TabsTrigger> */}
        </TabsList>
      </div>
      <TabsContent value="participants_intervention" className="relative flex flex-col gap-4 overflow-auto">
        <DataTableClient data={participantDataIG} groupType="chat" />
      </TabsContent>
      <TabsContent value="participants_control" className="relative flex flex-col gap-4 overflow-auto">
        <DataTableClient data={participantDataCG} groupType="nochat" />
      </TabsContent>
      <TabsContent value="conversation_list" className="flex flex-col">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="control_responses" className="flex flex-col">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
    </Tabs>
}