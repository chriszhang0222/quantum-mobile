<template>
    <div>
        <div class="title-block" style="text-align: center;margin-top: 10px">
            <span>Company Information</span>
        </div>
        <div class="input-card">
            <el-form>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Company Name" required>
                            <el-input type="text" v-model="supplier.vendorname" placeholder="Company Name">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="DBA">
                            <el-input type="text" v-model="supplier.dba" placeholder="DBA"
                            ></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Fed Tax ID">
                            <el-input type="text" v-model="supplier.federaltaxid" placeholder="Fed Tax ID">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="D-U-N-S Number">
                            <el-input type="text" v-model="supplier.duns" placeholder="D-U-N-S Number">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" >
                    <el-col :span="12">
                        <el-form-item label="OwnerShip">
                            <el-select v-model="supplier.ispublic">
                                <el-option v-for="(item,index) in public_choice" :key="index" :value="item" :label="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Company Type">
                            <el-select v-model="supplier.structurecode">
                                <el-option v-for="(item, index) in structureCode" :key="index"
                                           :value="item" :label="item">

                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="Headquarter Address">
                            <el-input v-model="supplier.address" placehodler="Headerquarter Address"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Suite/Unit">
                            <el-input v-model="supplier.address2" placeholder="Suite/Unit">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="City">
                            <el-input v-model="supplier.city" placeholder="City">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="State">
                            <el-select v-model="supplier.state" placeholder="State">
                                <el-option v-for="(item, index) in state_list"
                                           :key="index"
                                           :value="item[0]"
                                           :label="item[1]">

                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Zip Code">
                            <el-input v-model="supplier.zip" placeholder="Zip Code">

                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="Branch Address">
                            <el-input v-model="supplier.branch_address" placehodler="Branch Address"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Suite/Unit">
                            <el-input v-model="supplier.branch_address2" placeholder="Suite/Unit">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="City">
                            <el-input v-model="supplier.branch_city" placeholder="City">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="State">
                            <el-select v-model="supplier.branch_state" placeholder="State">
                                <el-option v-for="(item, index) in state_list"
                                           :key="index"
                                           :value="item[0]"
                                           :label="item[1]">

                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Zip Code">
                            <el-input v-model="supplier.branch_zip" placeholder="Zip Code">

                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Website">
                            <el-input v-model="supplier.website" placeholder="Website">

                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Year Company Established">
                            <el-input v-model="supplier.established" placeholder="YYYY"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="Business Category">
                            <el-select v-model="supplier.business_category">
                                <el-option v-for="(item, index) in business_category"
                                           :key="index"
                                           :value="item[0]"
                                           :label="item[1]">

                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="title-block" style="text-align: center;margin-top: 20px">
            <span>Parent Company Information</span>
        </div>
        <div class="input-card">
            <el-form>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="Is there a parent company?">
                            <el-switch v-model="supplier.parentcompany"></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Parent Company Name" :required="supplier.parentcompany">
                            <el-input v-model="supplier.parentcompanyname" :disabled="!supplier.parentcompany"
                            placeholder="Parent Compant Name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Parent Fed Tax ID" :required="supplier.parentcompany">
                            <el-input v-model="supplier.parentcompanyfedid" :disabled="!supplier.parentcompany"
                            placeholder="Parent Company Fed Tax ID"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="title-block" style="text-align: center;margin-top: 20px">
            <span> Company Contact Information</span>
        </div>
        <div class="input-card">
            <el-form>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Name">
                            <el-input placeholder="Name" v-model="supplier.contactname"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Title">
                            <el-input placeholder="Title" v-model="supplier.contacttitle"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Email">
                            <el-input placeholder="Email" v-model="supplier.contactemail"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Phone">
                            <el-input placeholder="Title" v-model="supplier.contactphone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Cell">
                            <el-input placeholder="Cell" v-model="supplier.contactcell"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Fax">
                            <el-input placeholder="Fax" v-model="supplier.contactfax"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="margin-top20">
                    <el-col :span="12">
                        <el-form-item label="Secondary Contact Name">
                            <el-input placeholder="Secondary Contact Name" v-model="supplier.contactname2"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Title">
                            <el-input placeholder="Title" v-model="supplier.contacttitle2"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Email">
                            <el-input placeholder="Email" v-model="supplier.contactemail2"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Phone">
                            <el-input placeholder="Title" v-model="supplier.contactphone2"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Cell">
                            <el-input placeholder="Cell" v-model="supplier.contactcell2"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Fax">
                            <el-input placeholder="Fax" v-model="supplier.contactfax2"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="title-block" style="text-align: center;margin-top: 20px">
            <span>NAICS Code</span>
        </div>
        <div class="input-card">
            <el-form>
                <el-row>
                    <el-col :span="24">
                    <el-form-item label="Primary NAICS Code">
                        <el-select
                                   filterable
                                   remote
                                   :remote-method="getNaics"
                                   @change="primaryNaicsChange"
                                   v-model="primarynaics"
                        >
                            <el-option
                                    :style="{left: windowWidth <= 500 ? 550 + 'px' : 0 + 'px'}"
                                    v-for="(item,index) in naics_list"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.label">
                            </el-option>
                        </el-select>

                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                    <el-form-item label="Secondary NAICS Code">
                        <el-select
                                  v-model="secondarynaics"
                                   filterable
                                   remote
                                   :remote-method="getNaics"
                                   @change="secondNaicsChange">
                            <el-option
                                    :style="{left: windowWidth <= 500 ? 550 + 'px' : 0 + 'px'}"
                                    v-for="(item,index) in naics_list"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="title-block" style="text-align: center;margin-top: 20px">
            <span>Commodity Code</span>
        </div>
        <div class="input-card">
            <el-form>
                <el-row>
                    <el-form-item label="Commodity">
                        <el-select
                                   filterable
                                   remote
                                   :remote-method="getCommodity"
                                   @change="commodityChange"
                                   v-model="commodity"
                        >
                            <el-option
                                    :style="{left: windowWidth <= 500 ? 500 + 'px' : 0 + 'px'}"
                                    v-for="item in commodity_list"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>

        <div class="title-block" style="text-align: center;margin-top: 20px">
            <span>Company Details</span>
        </div>
        <div class="input-card">
            <el-form>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="Primary Location Name">
                            <el-input v-model="supplier.primarylocation" placeholder="Primary Location Name"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="U.S. Service Areas">
                            <el-select multiple v-model="supplier.geographicservicearea"
                            :collapse-tags="true">
                                <el-option v-for="(item, index) in state_list"
                                           :key="index"
                                           :value="item[0]"
                                           :label="item[1]"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="International Service Areas">
                            <el-select multiple v-model="supplier.otherlocation" :collapse-tags="true">
                                <el-option v-for="(item, index) in service_area"
                                :key="index"
                                :value="item"
                                :label="item">

                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="Number of Permanent Employees">
                        <el-select v-model="supplier.employeecount">
                            <el-option v-for="(item, index) in employee_number"
                            :key="index"
                            :label="item[1]"
                            :value="item[0]">
                            </el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Number of Women Employees">
                            <el-input placeholder="Number of Women Employees"
                                      v-model="supplier.womanemployeecount">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Number of Minority Employees">
                            <el-input placeholder="Number of Minority Employees"
                                      v-model="supplier.minorityemployeecount">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label=" Do you have a Signed Statement of Non-Disclosure or Vendor Services Agreement on file with Demo Company?">
                            <el-switch v-model="supplier.has_signed_nda">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="Top Five Business Customers">
                            <el-input v-model="supplier.topfive"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="Keywords pertinent to your product and services">
                            <AutoCompleteInput
                                    style="width: 100%"
                            v-model="supplier.keywords"
                            placeholder="Add Keyword">
                            </AutoCompleteInput>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="Products and Services">
                            <el-input placeholder="Describe your business capabilities"
                                      type="textarea"
                                      :autosize="{ minRows: 2, maxRows: 2}"
                                      v-model="supplier.servicedescription"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Does your company track Tier II spend?">
                            <el-switch v-model="supplier.track_tier2_spend" ></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Have you previously done business with Demo Company?">
                            <el-switch v-model="supplier.previousbiz"></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="title-block" style="text-align: center;margin-top: 20px">
            <span>Ownership</span>
        </div>
        <div class="input-card">
            <el-row class="margin-bottom10" v-if="supplier.id !== null && supplier.id !== undefined">
                <el-col :span="24" align="left">
                    <el-button @click="exist_owner=true">Show Submitted Ownership</el-button>
                </el-col>
            </el-row>
            <el-form :rules="owner_rules" ref="ownerForm" :model="owner_form">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="Owned by corporate">
                            <el-switch v-model="owner_form.is_owned_by_corporate">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Owner Name" prop="name">
                            <el-input placeholder="Owner Name" v-model="owner_form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Ethnicity" prop="ethnicity">
                            <el-select v-model="owner_form.ethnicity">
                                <el-option v-for="(item,index) in ethnicity"
                                :value="item"
                                :key="index"
                                :label="item">

                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="Ownership %" prop="percentageowner">
                            <el-input v-model="owner_form.percentageowner"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Gender">
                            <el-select v-model="owner_form.gender">
                                <el-option value="M" label="M"></el-option>
                                <el-option value="F" label="F"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="US Citizen / Perm. Resident">
                            <el-switch v-model="owner_form.uscitizen"></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="title-block" style="text-align: center;margin-top: 20px">
            <span>Certificates</span>
        </div>
        <div class="input-card">
            <el-form :model="cert_upload" :rules="cert_upload_rules" ref="certificateForm">
                <div>
                    <el-row class="margin-bottom10" v-if="supplier.id !== null && supplier.id !== undefined">
                        <el-col :span="24" align="left">
                            <el-button @click="showExistCert">Show Uploaded Certificates</el-button>
                        </el-col>
                    </el-row>
                    <el-row :gutter="5">
                        <el-col :span="8">
                            <el-form-item label="Source">
                                <el-select v-model="cert_upload.source" @change="sourceChange">
                                    <template v-if="supplier.id">
                                        <el-option value="agency" label="Agency"></el-option>
                                        <el-option value="self" label="Self"></el-option>
                                    </template>
                                    <template v-else>
                                        <el-option value="agency" label="Agency"></el-option>
                                    </template>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="Type" prop="type">
                                <el-select v-model="cert_upload.type">
                                    <el-option v-for="(item,index) in cert_type_self" :key="index"
                                    :label="item" :value="item"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="cert_upload.agency">
                            <el-form-item label="Agency" prop="agency_name">
                                <el-input v-model="cert_upload.agency_name" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="!cert_upload.agency && cert_upload.type.length > 0">
                            <el-button size="large" style="margin-top: 20px" @click="showSelfCert">
                                <font-awesome-icon icon="edit"></font-awesome-icon>Self Certify</el-button>
                        </el-col>
                    </el-row>
                    <el-row :gutter="5" v-if="cert_upload.agency">
                        <el-col :span="8">
                            <el-form-item label="Cert Number">
                                <el-input placeholder="Cert Number" v-model="cert_upload.certnumber"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="Expiration Date" prop="certexpdate">
                                <el-date-picker placeholder="Expiration Date" style="width: 100%"
                                v-model="cert_upload.certexpdate" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-if="cert_upload.agency">
                        <el-col :span="8" align="left">
                            <el-button type="primary" size="large" style="width: 100%" @click="selectCertFile">Upload</el-button>
                            <input hidden type="file" ref="cert_file" id="file_input0" name="cert_file0" @change="certFileChanged">
                            <el-alert type="success" v-if="cert_upload.fileName !== null">{{cert_upload.fileName}}</el-alert>
                            <el-alert type="error" v-if="!cert_upload.has_file">You didn't upload a file</el-alert>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
        </div>

        <div class="title-block" style="text-align: center;margin-top: 20px">
            <span>Sales Revenue For The Last 3 Years</span>
        </div>
        <div class="input-card">
            <el-form>
                <el-row :gutter="10">
                    <el-col :span="4" style="margin-top: 20px">
                        <label>2018</label>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="Revenue">
                            <el-input v-model="supplier.year1sales">
                                <template slot="prepend">$</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-button style="margin-top: 20px">Upload</el-button>
                    </el-col>
                </el-row>
                <el-row :gutter="10" class="margin-top10">
                    <el-col :span="4" style="margin-top: 20px">
                        <label>2019</label>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="Revenue">
                            <el-input v-model="supplier.year2sales">
                                <template slot="prepend">$</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-button style="margin-top: 20px">Upload</el-button>
                    </el-col>
                </el-row>
                <el-row :gutter="10" class="margin-top10">
                    <el-col :span="4" style="margin-top: 20px">
                        <label>2020</label>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="Revenue">
                            <el-input v-model="supplier.year3sales">
                                <template slot="prepend">$</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-button style="margin-top: 20px">Upload</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="title-block" style="text-align: center;margin-top: 20px">
            <span>Company Classification</span>
        </div>
        <div class="input-card">
            <el-form>
                <el-row>
                    <el-col :span="24" align="left">
                        <el-checkbox-group v-model="supplier.certtypes">
                            <el-checkbox v-for="item in cert_types"
                            :value="item"
                            :key="item"
                            :label="item">
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-row>
                <el-row class="margin-top20" :gutter="20">
                    <el-col :span="12">
                        <label></label>
                        <el-button style="margin-top: 20px" size="sm" @click="dialogFormVisible=true">Check Small Business</el-button>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Ethnicity">
                            <el-select v-model="supplier.ethnicity">
                                <el-option
                                        v-for="(item,index) in ethnicity"
                                        :key="index"
                                        :label="item"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="title-block" style="text-align: center;margin-top: 20px">
            <span>References</span>
        </div>
        <div class="input-card">
            <el-form>
                <el-row :gutter="10">
                    <el-col :span="12">
                    <el-form-item>
                        <el-input placeholder="Name" v-model="supplier.referencename1"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item>
                            <el-input placeholder="Phone" v-model="supplier.referencephone1"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item>
                            <el-input placeholder="Email" v-model="supplier.referenceemail1"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item>
                            <el-input placeholder="Company" v-model="supplier.referencecompany1"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="title-block" style="text-align: center;margin-top: 20px">
            <span>Sustainability/Community Involvement</span>
        </div>
        <div class="input-card">
            <el-form>
                <el-row>
                    <el-col :span="24">
                        <el-form-item>
                            <el-input v-model="supplier.socialprogram"
                                      type="textarea"
                                      :autosize="{ minRows: 2, maxRows: 4}"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="title-block" style="text-align: center;margin-top: 20px">
            <span>Insurance Information</span>
        </div>
        <div class="input-card">
            <el-form>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Type">
                            <label>Workers Compensation</label>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Carrier">
                            <el-input v-model="supplier.wccarrier"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Amount">
                            <el-input v-model="supplier.wcamount">
                                <template slot="prepend">$</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Expiration Date">
                            <el-date-picker v-model="supplier.wc_expiration_date"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" size="large" style="width: 100%" @click="add_insurance(1)">Upload</el-button>
                        <input hidden type="file" ref="insurancefile1" id="insurancefile1" />
                    </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Type">
                            <label>General Ability</label>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Carrier">
                            <el-input v-model="supplier.glcarrier"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Amount">
                            <el-input v-model="supplier.glamount">
                                <template slot="prepend">$</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Expiration Date">
                            <el-date-picker v-model="supplier.gl_expiration_date"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" size="large" style="width: 100%" @click="add_insurance(2)">Upload</el-button>
                        <input hidden type="file" ref="insurancefile2" id="insurancefile2" />
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="title-block" style="text-align: center;margin-top: 20px">
            <span>Upload Additional Company Information</span>
        </div>
        <div class="input-card">
            <el-row v-if="supplier.id !== undefined && supplier.supplierfile_set.length > 0">
                <el-col :span="24" align="left">
                    <el-button @click="additional_file_show = true">Show uploaded Files</el-button>
                </el-col>
            </el-row>
            <el-form class="margin-top10">
                <el-form-item v-for="(item, index) in additional_File" :key="item.key">
                <el-row :gutter="10">
                    <el-col :span="20">
                    <el-button type="primary" size="large" style="width: 100%" @click="additionalFile(index)">Upload</el-button>
                    <input hidden type="file" :ref="'additionalFile' + index" :id="'additionalFile' + index" :name="'additionalFile' + index" @change="additionalFileChanged(index)"/>
                    <el-alert type="success" v-if="item.uploaded">{{ item.name }}</el-alert>
                    </el-col>
                    <el-col :span="4">
                        <el-button @click="add_additional(index)"><i class="el-icon-circle-plus"></i></el-button>
                    </el-col>
                </el-row>
                </el-form-item>
            </el-form>
        </div>

        <div class="input-card">
        <el-row>
            <el-col :span="12" align="left">
                <el-button type="success" @click="submitForm">
                    Submit
                </el-button>
            </el-col>
        </el-row>
        </div>

        <el-dialog title="Check Small Business Status" :append-to-body="true" :visible.sync="dialogFormVisible" width="100%">
            <el-dialog
                    width="30%"
                    title=""
                    :visible.sync="innerVisible"
                    append-to-body>
                <el-row>
                    <h2>{{ sbe_result }}</h2>
                </el-row>
            </el-dialog>
            <el-form>
                <el-row>
                    <el-col :span="24">
                        <el-form-item required label="NAICS Code">
                            <el-autocomplete v-model="sbe_status.code" style="width: 100%"
                                             value-key="label"
                                      :fetch-suggestions="queryNAICS"
                                      @select="handleNAICSinCheck"
                            ></el-autocomplete>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="NAICS Description">
                            <el-input v-model="sbe_status.desc" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="checkSBEStatus">Check</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="'SUPPLIER ' +  cert_upload.type + ' SELF-CERTIFICATION FORM'" :visible.sync="show_self_cert" width="100%" :append-to-body="true">
            <el-form>
                <el-row align="left">
                    <el-col :span="24" align="left">
                    <span>Company Name: {{ supplier.vendorname }}</span>
                    </el-col>
                </el-row>
                <el-row align="left">
                    <el-col :span="24" align="left">
                        <span>Date: {{ new Date()|dateFormatter }}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" align="left">
                        <strong>You selected self-certification for {{ cert_upload.type }}.
                            <template v-if="cert_upload.type !== '' && cert_dic[cert_upload.type.toUpperCase().trim()].desc">
                                <p>{{ cert_dic[cert_upload.type].desc }}</p>
                            </template>
                        </strong>
                    </el-col>
                </el-row>
                <el-row class="margin-top20">
                    <el-col :span="24" align="left">
                        By my signature below, I certify that I have correctly and accurately identified the proper Business Classification for my company identified above. I understand that my act of correctly classifying my company is imperative to ensure proper classification in various data systems and for proper reporting of information. I also understand that federal law provides penalties for misrepresentation of size and owner status information. I further understand that I and/or my company may be held responsible for any damages incurred by Northbound as a result of any false or inaccurate information I provide here. I agree to notify Northbound by means of re-submitting an updated Business Classification Form if my company's Business Classification should ever change at any point in the future from the classification I have recorded here.
                        <strong>This form is valid for 1(one) year from the date completed.</strong>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>
        <el-dialog title="Certificates" :visible.sync="exist_certs" width="100%" :append-to-body="true">
            <el-dialog
                    width="100%"
                    title=""
                    :height="500"
                    :visible.sync="cert_file_visiable"
                    append-to-body>
                <el-row>
                    <iframe :src="cert_file_url" width="100%" height="500px" type="application/pdf" />
                </el-row>
            </el-dialog>
            <el-row>
                <el-col :span="8"> <span>Agency</span></el-col>
                <el-col :span="8"><span>Diversity Category</span></el-col>
                <el-col :span="8"><span>Expiration Date</span></el-col>
            </el-row>
            <el-divider></el-divider>
            <template v-for="(cert, index) in supplier.suppliercertificates_set" class="margin-bottom10">
                <el-row :key="index" class="margin-bottom10">
                    <el-col :span="8"><span style="color: #3a8ee6" @click="showCertfilePDF(cert)">{{cert.certagency }}</span></el-col>
                    <el-col :span="8">{{cert.divcat}}</el-col>
                    <el-col :span="8">{{cert.certexpdate}}</el-col>
                </el-row>
                <el-divider :key="index"></el-divider>
            </template>
        </el-dialog>
        <el-dialog title="Ownership" :visible.sync="exist_owner" width="100%" :append-to-body="true">
            <template v-for="(owner, index) in supplier.supplierowner_set">
                <el-row :key="owner.name" class="margin-bottom10" :gutter="20">
                    <el-col :span="8">
                        <span>Name: </span>{{ owner.name }}
                    </el-col>
                    <el-col :span="8">
                        <span>Ethnicity: </span>{{owner.ethnicity}}
                    </el-col>
                    <el-col :span="8">
                        <span>Gender: </span>{{ owner.gender}}
                    </el-col>
                </el-row>
                <el-row :key="index+100" class="margin-bottom10" :gutter="20">
                    <el-col :span="8">
                        <span>Percentage: </span>{{owner.percentageowner}}
                    </el-col>
                    <el-col :span="8">
                        <span>US Citizen:</span>{{owner.uscitizen|truetransfer}}
                    </el-col>
                </el-row>
                <el-divider :key="index"></el-divider>
            </template>
        </el-dialog>
        <el-dialog title="Additional Company Information" :visible.sync="additional_file_show" width="100%" :append-to-body="true">
            <el-dialog
                    width="100%"
                    title=""
                    :height="500"
                    :visible.sync="additional_file_visiable"
                    append-to-body>
                <el-row>
                    <iframe :src="addition_file_url" width="100%" height="500px" type="application/pdf" />
                </el-row>
            </el-dialog>
            <el-row v-for="(item, index) in supplier.supplierfile_set" class="margin-bottom10" :key="index">
                <el-col :span="20">
                    <span @click="show_additional_file(item)" style="color: #3a8ee6">{{ item.filename}}</span>
                </el-col>
                <el-divider></el-divider>
            </el-row>

        </el-dialog>
    </div>

</template>

<script>
    import axios from 'axios';
    import {Tools} from "@/utils/Tools";
    import {state_list} from "@/utils/Constants";
    import {Toast} from "@/utils/Toast";
    import {supplierNaics, supplierCommodity,  isSmallBusiness, supplierEditPost} from "@/quantumApi/supplier/supplier";
    import AutoCompleteInput from "@/components/AutoCompleteInput";
    import {CERT_TYPES, ETHNICITY, CERT_TYPES_IN_CERTIFICATE_SUBMIT, CERT_DIC} from "@/utils/Constants";
    import {apiXMLHTTPRequest} from "@/quantumApi/axiosCommon";
    import {SessionStorage} from "@/utils/SessionStorage";
    import {SESSION_KEY_LOGIN_USER, NEW_CHAT_MESSAGE, AUTH_TOKEN} from "@/utils/Constants";
    import {cert_upload_rules_agency} from "@/utils/Constants";

    export default {
        name: "SupplierSubmitForm",
        components: {AutoCompleteInput},
        props: {
            supplier_data: {
                required: false,
                type: Object,
                agency: true
            },
            auth: {
                required: true
            },
        },
        computed:{
            supplier(){
                return this.supplier_data || {certtypes:[]};
            },
            primarynaics(){
                if(this.supplier_data.primarynaicscode === undefined)
                    return '';
                return this.supplier_data.primarynaicscode + '-' + this.supplier_data.primarynaicsdescription;
            },
            secondarynaics(){
                if(this.supplier_data.secondarynaicscode === undefined)
                    return '';
                return this.supplier_data.secondarynaicscode + '-' + this.supplier_data.secondarynaicsdescription;
            },
            commodity(){
                return this.supplier_data.commodity;
            }
        },
        mounted(){
            this.user_id = SessionStorage.getJson(SESSION_KEY_LOGIN_USER).user_id;
        },
        data(){
            return {
                addition_file_url: null,
                additional_file_visiable: false,
                cert_file_url: null,
                cert_file_visiable: false,
                owner_rules: {
                    name: [{required: true, message: 'Please input ownername', trigger: 'blur'}],
                    ethnicity: [{required: true, message: 'Please select ethnicity', trigger: 'blur'}],
                    percentageowner: [{required: true, message: 'Please input percentage', trigger: 'blur'}]
                },
                cert_upload_rules: {
                },
                user_id: null,
                additional_file_show: false,
                additional_File: [
                    {value: '',
                        uploaded: false,
                        name:'',
                    key: 'additional0'}
                ],
                exist_owner: false,
                exist_certs: false,
                owner_form:{},
                cert_dic: CERT_DIC,
                show_self_cert: false,
                cert_upload:{
                    source: 'agency',
                    agency: true,
                    type: '',
                    invalid: false,
                    has_file: true,
                    certexpdate: null,
                    agency_name: null,
                    certnumber: null,
                    fileName: null
                },
                sbe_result: '',
                innerVisible: false,
                sbe_status:{
                  code: '',
                  desc: '',
                    query: ''
                },
                dialogFormVisible: false,
                ethnicity: ETHNICITY,
                cert_types: CERT_TYPES,
                cert_type_self: CERT_TYPES_IN_CERTIFICATE_SUBMIT,
                windowWidth: window.innerWidth,
                public_choice: ['Private', 'Public'],
                structureCode: [
                    'Corporation',
                   'S-Corporation',
                    'C-Corporation',
                    'Partnership',
                    'Sole Proprietorship',
                    'Limited Liability Company',
                    'Government',
                    'Non Profit',
                    'Joint Venture',
                    'Other'
                ],
                state_list: state_list,
                business_category: [
                    [1, 'Manufacturer'],
                    [2, 'Distributor/Re-seller'],
                    [3, 'Other']
                ],
                show_parent: false,
                naics_list: [],
                commodity_list: [],
                service_area: [
                    'East Asia and The Pacific',
                    'South Asia',
                    'Africa',
                    'North America',
                    'South America',
                    'Europe',
                    'Middle East',
                    'Russia and Eurasia'
                ],
                employee_number: [
                    ["50", "0-50"],
                    ["100", "51-100"],
                    ["150", "101-150"],
                    ["200", "151-200"],
                    ["250", "201-250"],
                    ["500", "251-500"],
                    ["750", "501-750"],
                    ["1000", "751-1000"],
                    ["1500", "1001-1500"],
                    ["2000", "More than 1500"]
                ]
            }
        },
        methods: {
            show_additional_file(item){
              this.additional_file_visiable = true;
              this.addition_file_url = process.env.VUE_APP_SERVER + item.upload_path
            },
            showCertfilePDF(cert){
                this.cert_file_visiable = true;
                this.cert_file_url = process.env.VUE_APP_SERVER + cert.upload_path
            },
            add_insurance(index){

            },
            add_additional(index){
                let key = index + 1;
                this.additional_File.push({
                    key: 'additionalFile' + key,
                    value: '',
                    uploaded: false,
                    name: '',
                });
            },
            additionalFile(index){
                let id = 'additionalFile' + index;
                document.getElementById(id).click();
            },
            certFileChanged(){
              this.cert_upload.has_file = true;
              this.cert_upload.fileName = this.$refs.cert_file.files[0].name;
            },
            additionalFileChanged(index){
                let id = 'additionalFile' + index;
              this.$message.success('Upload file successfully!');
              this.additional_File[index].uploaded = true;
              this.additional_File[index].name = document.getElementById(id).files[0].name
            },
            showSelfCert(){
                this.show_self_cert = true;
            },
            showExistCert(){
              console.log(this.supplier.id);
              this.exist_certs = true;
            },
            sourceChange(val){
                if(val === 'agency'){
                    this.cert_upload.agency = true;
                }else if(val === 'self'){
                    this.cert_upload.agency = false;
                }
            },
            getCommodity(query){
              let vm = this;
              this.commodity_list = [];
              if(query !== ''){
                  supplierCommodity({'term': query})
                  .then((res) => {
                      if(res.status === 200){
                          vm.commodity_list = res.data.results;
                      }
                  })
              }
            },
            commodityChange(val){
                this.supplier.commodity = val;
                this.supplier.commoditydescription = val;
            },
            getNaics(query){
                let vm = this;
                this.naics_list = [];
                if(query !== ''){
                    supplierNaics({'term': query})
                    .then((res) => {
                        if(res.status === 200) {
                            vm.naics_list = res.data;
                        }
                    });
                }
            },
            primaryNaicsChange(val){
                val = val.split("-");
                this.supplier.primarynaicscode = val[0].trim();
                this.supplier.primarynaicsdescription = val[1].trim();
            },
            secondNaicsChange(val){
                val = val.split("-");
                this.supplier.secondarynaicscode = val[0].trim();
                this.supplier.secondarynaicsdescription = val[1].trim();
            },
            validateForm(){
                let allFormValid = true;
                if(this.supplier.id === undefined || this.supplier.id === null) {
                    this.$refs.ownerForm.validate(valid => {
                        if (!valid) {
                            allFormValid = false;
                            this.$message.error('Ownership is required');
                            return;
                        }
                    });
                }
                if(this.cert_upload.type !== '' || this.cert_upload.certexpdate !== null || this.cert_upload.agency_name !== null){
                    this.cert_upload_rules = cert_upload_rules_agency;
                    this.$refs.certificateForm.validate(valid => {
                       if(!valid){
                           allFormValid = false;
                           this.$message.error('Certificate is not complete!');
                           return;
                       }
                    });
                    if(this.$refs.cert_file.files[0] === undefined || this.$refs.cert_file.files[0] === null){
                        allFormValid = false;
                        this.cert_upload.has_file = false;
                    }

                }

                return allFormValid;
            },
            submitForm(){
                if(!this.validateForm()){
                    return;
                }
                let param = new FormData();
                this.formatSupplier();
                param.append('supplier', JSON.stringify(this.supplier));
                param.append('user_id', this.user_id);
                if(Tools.isNotEmpty(this.owner_form)) {
                    param.append('ownership', JSON.stringify(this.owner_form));
                }
                if(this.cert_upload.has_file) {
                    param.append('cert_file', this.$refs.cert_file.files[0]);
                    param.append('certificate', JSON.stringify(this.cert_upload));
                }
                if(this.additional_File.length > 0) {
                    for (let i = 0; i < this.additional_File.length; i++) {
                        if (this.additional_File[i].uploaded && this.additional_File[i].name !== '') {
                            param.append('additionalFile-' + i, this.$refs['additionalFile' + i][0].files[0]);
                        }
                    }
                }
                apiXMLHTTPRequest(param, 'supplier/edit_mobile/', this.auth, (res) => {
                    if(res.success){
                        if(res.supplier){
                            let user = SessionStorage.getJson(SESSION_KEY_LOGIN_USER);
                            user['supplier'] = res.supplier;
                            SessionStorage.set(SESSION_KEY_LOGIN_USER, user);
                        }
                        this.$router.push('/select');
                        this.$message.success('You have submitted the supplier profile');
                    }
                });
            },
            formatSupplier(){
                let newKeyword = [];
                if(this.supplier.keywords !== undefined && this.supplier.keywords.length !== 0){
                    this.supplier.keywords.forEach((key,val) => {
                        newKeyword.push(key.value);
                    })
                }
                this.supplier.keywords = newKeyword.join(',');
                if(this.supplier.geographicservicearea !== undefined && this.supplier.geographicservicearea.length > 0){
                    this.supplier.geographicservicearea = this.supplier.geographicservicearea.join('|');
                }else{
                    this.supplier.geographicservicearea = '';
                }
                if(this.supplier.otherlocation !== undefined && this.supplier.otherlocation.length > 0){
                    this.supplier.otherlocation = this.supplier.otherlocation.join('|');
                }else{
                    this.supplier.otherlocation = '';
                }
                if(this.supplier.certtypes.length > 0){
                    this.supplier.certtypes = this.supplier.certtypes.join(',');
                }else{
                    this.supplier.certtypes = '';
                }
            },
            selectCertFile(){
                document.getElementById('file_input0').click()
            },
            checkSBEStatus(){
                this.sbe_result = '';
                if(this.sbe_status.code === ''){
                    this.$message.error('NAICS Code is Required');
                    return;
                }
                let params = {
                    naics_code: this.sbe_status.query,
                    naics_name: this.sbe_status.desc
                }
                isSmallBusiness(params)
                .then((res) => {
                    if(res.status === 200){
                        this.innerVisible = true;
                        this.sbe_result = res.data.message;
                    }else{
                        return;
                    }
                })

            },
            queryNAICS(query, cb){
                if(query === ''){
                    return;
                }
                supplierNaics({term: query})
                .then((res) => {
                    if(res.status === 200){
                        cb(res.data);
                    }
                });


            },
            handleNAICSinCheck(val){
                let data = val.label;
                let naics = data.split('-')
                this.sbe_status.desc = naics[1].trim();
                this.sbe_status.query = naics[0].trim();
            },
            handleGeoOption(val){
                alert(val);
            }
        }
    }
</script>

<style>
    .input-card{
        padding: 10px;
        background-color: white;
        border-bottom: 2px solid #373a43;;
    }
    .el-form-item {
        margin-bottom: 5px;
    }
    .el-form-item__label{
        line-height: 20px;
    }
    .el-select{
        width: 100%;
    }
    .tags-input {
        padding: 10px 10px;
        width: 100%;
    }
    .el-form-item__label{
        text-align: left !important;
    }

</style>
